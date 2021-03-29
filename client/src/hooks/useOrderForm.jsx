import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getMaterialList, getOrders, postOrders } from 'utils/api/orders.js';
import { createShipment } from 'utils/api/shippings.js';

const useOrderForm = () => {
  const toast = useToast();
  const manufacturer = useRef('');
  const location = useRef('');
  const note = useRef('');
  const quantityRef = useRef(1);
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
        vendorLocation: location.current.value,
        status: 'Pending',
        note: note.current.value,
      });
      await createShipment({
        company: manufacturer.current.value,
        location: location.current.value,
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
