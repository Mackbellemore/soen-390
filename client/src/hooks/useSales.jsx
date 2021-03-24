import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createSale, getSales, updateSale } from 'utils/api/sales.js';

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
  const [quantity, setQuantity] = useState(1);
  const {
    isOpen: isSaleModalOpen,
    onOpen: onSaleModalOpen,
    onClose: onSaleModalClose,
  } = useDisclosure();

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
        quantity,
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
    setQuantity(1);
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
    isSaleModalOpen,
    onSaleModalOpen,
    onSaleModalClose,
    emailRef,
    setSelectedBikeId,
    setName,
    setQuantity,
    selectedBikeId,
    isLoadingButton,
    name,
  };
};

export default useSales;
