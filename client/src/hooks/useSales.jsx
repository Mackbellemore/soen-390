import { useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createSale, getSales, updateSale } from 'utils/api/sales.js';
import { getOneBike } from 'utils/api/bikes.js';
import { createShipment } from 'utils/api/shippings.js';

const useSales = (sale) => {
  const {
    isOpen: isInfoModalOpen,
    onOpen: onInfoModalOpen,
    onClose: onInfoModalClose,
  } = useDisclosure();
  const toast = useToast();
  const { refetch } = useQuery('sales', getSales);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [name, setName] = useState(undefined);
  const emailRef = useRef('');
  const [selectedBikeId, setSelectedBikeId] = useState(undefined);
  const quantityRef = useRef(1);
  const [bikeMaxStock, setBikeMaxStock] = useState(1);
  const [shippingDate, setShippingDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [location, setLocation] = useState('');

  const {
    isOpen: isSaleModalOpen,
    onOpen: onSaleModalOpen,
    onClose: onSaleModalClose,
  } = useDisclosure();
  const { data: bikeData, isSuccess } = useQuery(`bikes/${selectedBikeId}`, () => {
    if (selectedBikeId !== undefined) getOneBike(selectedBikeId);
  });

  useEffect(() => {
    if (isSuccess && selectedBikeId !== undefined) setBikeMaxStock(bikeData.data.stock);
  }, [bikeData?.data.stock, isSuccess, selectedBikeId]);

  const handleStatusColor = (status) => {
    switch (status) {
      case 'Fulfilled':
        return 'green';
      case 'Processing':
        return 'yellow';
      case 'Cancelled':
        return 'red';
    }
  };

  const handleLocationInput = (e) => {
    setLocation(e.target.value);
  };
  const handleDeliveryDateInput = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleShippingDateInput = (e) => {
    setShippingDate(e.target.value);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateSale({
        _id: sale._id,
        status: newStatus,
        bikeId: sale.bikeId,
      });
      refetch();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    onInfoModalClose();
  };

  const handleSubmit = async () => {
    setIsLoadingButton(true);
    try {
      await createSale({
        bikeId: selectedBikeId,
        customerEmail: emailRef.current.value,
        customerName: name,
        quantity: quantityRef.current.value,
      });
      await createShipment({
        company: name,
        location: location,
        status: 'Ordered',
        deliveryDate: deliveryDate,
        shippingDate: shippingDate,
      });
      toast({
        title: 'Sale/Shipment Placed',
        description: 'The sale and shipment have been placed',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      refetch();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    setSelectedBikeId(undefined);
    setName(undefined);
    setIsLoadingButton(false);
    onSaleModalClose();
  };

  return {
    isInfoModalOpen,
    onInfoModalOpen,
    onInfoModalClose,
    handleStatusColor,
    handleStatusChange,
    handleSubmit,
    handleDeliveryDateInput,
    handleShippingDateInput,
    handleLocationInput,
    isSaleModalOpen,
    onSaleModalOpen,
    onSaleModalClose,
    emailRef,
    setSelectedBikeId,
    setName,
    selectedBikeId,
    isLoadingButton,
    name,
    quantityRef,
    bikeMaxStock,
    deliveryDate,
    shippingDate,
    location,
  };
};

export default useSales;
