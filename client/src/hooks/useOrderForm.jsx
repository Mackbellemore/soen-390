import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getMaterialList, getOrders, postOrders } from 'utils/api/orders.js';
import { createShipment } from 'utils/api/shippings.js';
import { getSearchResults } from 'utils/api/mapbox.js';
import { useDebouncedCallback } from 'use-debounce';

const useOrderForm = () => {
  const toast = useToast();
  const manufacturer = useRef('');
  const note = useRef('');
  const quantityRef = useRef(1);
  const [location, setLocation] = useState('');
  const [material, setMaterial] = useState(null);
  const [cost, setCost] = useState(0);
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const materialCost = useQuery('orders/materialList', getMaterialList);
  const { refetch } = useQuery('orders', getOrders);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // sets material and cost states
  const handleMaterial = (e) => {
    const choice = e.target.value;
    setMaterial(choice);
    setCost(materialCost.data.data[choice].cost);
  };

  const handleDeliveryDateInput = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleShippingDateInput = (e) => {
    setShippingDate(e.target.value);
  };

  const handleLocationSelect = (e) => {
    e ? setLocation(e) : setLocation(null);
  };

  const handleLocationInput = useDebouncedCallback((e) => {
    const searchLocation = e;
    if (searchLocation) {
      return getSearchResults(searchLocation);
    }
  }, 500);

  const handleSubmit = async () => {
    const orderTime = new Date();

    try {
      await postOrders({
        materialType: material,
        cost: cost,
        quantity: quantityRef.current.value,
        deliveryDate: deliveryDate,
        orderDate: orderTime,
        manufacturerName: manufacturer.current.value,
        vendorLocation: location.label,
        status: 'Pending',
        note: note.current.value,
      });
      await createShipment({
        company: manufacturer.current.value,
        location: location.label,
        status: 'Ordered',
        deliveryDate: deliveryDate,
        shippingDate: shippingDate,
      });
      toast({
        title: 'Order/Shipment Placed',
        description: 'The order and shipment have been placed',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch {
      toast({
        position: 'top',
        title: 'An error occurred.',
        description: 'Unable to place order.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    refetch();
    onClose();
    setMaterial(null);
  };

  return {
    handleMaterial,
    handleSubmit,
    handleDeliveryDateInput,
    handleShippingDateInput,
    handleLocationInput,
    handleLocationSelect,
    manufacturer,
    location,
    note,
    quantityRef,
    isOpen,
    onOpen,
    onClose,
    material,
    deliveryDate,
    shippingDate,
  };
};

export default useOrderForm;
