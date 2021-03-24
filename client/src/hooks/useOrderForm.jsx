import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getMaterialList, getOrders, postOrders } from 'utils/api/orders.js';

// generates a random int within ranges
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const useOrderForm = () => {
  const toast = useToast();
  const manufacturer = useRef('');
  const location = useRef('');
  const note = useRef('');
  const quantityRef = useRef(1);
  const [material, setMaterial] = useState(null);
  const [cost, setCost] = useState(0);
  const materialCost = useQuery('orders/materialList', getMaterialList);
  const { refetch } = useQuery('orders', getOrders);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // sets material and cost states
  const handleMaterial = (e) => {
    const choice = e.target.value;
    setMaterial(choice);
    setCost(materialCost.data.data[choice].cost);
  };

  const handleSubmit = async () => {
    const orderTime = new Date();
    const randomDeliveryDate = new Date().getDate() + getRandomInt(1, 8); // random delivery date within a week

    try {
      await postOrders({
        materialType: material,
        cost: cost,
        quantity: quantityRef.current.value,
        deliveryDate: randomDeliveryDate,
        orderDate: orderTime,
        manufacturerName: manufacturer.current.value,
        vendorLocation: location.current.value,
        status: 'Pending',
        note: note.current.value,
      });
      toast({
        title: 'Order Placed',
        description: 'The order has been placed',
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
    manufacturer,
    location,
    note,
    quantityRef,
    isOpen,
    onOpen,
    onClose,
    material,
  };
};

export default useOrderForm;
