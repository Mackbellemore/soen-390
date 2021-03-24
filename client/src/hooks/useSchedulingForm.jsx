import { useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createScheduling, getSchedulings } from 'utils/api/schedulings.js';

const useSchedulingForm = () => {
  const { refetch } = useQuery('schedulings', getSchedulings);

  // Modal (add new scheduling)
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [operatingTime, setOperatingTime] = useState('');
  const partType = useRef('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toast = useToast();

  const handleQuantityInput = (e) => {
    setQuantity(e.target.value);
  };

  const handleCostInput = (e) => {
    setCost(e.target.value);
  };

  const handleOperatingTime = (e) => {
    setOperatingTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    try {
      await createScheduling({
        partType: partType,
        quantity: quantity,
        cost: cost,
        operatingTime: operatingTime,
      });
      toast({
        title: 'Request Sent',
        description: 'Scheduling has been created successfully',
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
    setIsLoadingButton(false);
  };
  return {
    handleQuantityInput,
    handleCostInput,
    handleOperatingTime,
    handleSubmit,
    isLoadingButton,
    quantity,
    cost,
    operatingTime,
    partType,
  };
};
export default useSchedulingForm;
