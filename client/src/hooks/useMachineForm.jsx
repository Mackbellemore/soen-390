import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { createMachine, getMachines } from 'utils/api/machines.js';

const useMachineForm = () => {
  const { refetch } = useQuery('machine', getMachines);

  // Modal (add new machine)
  const [machineName, setMachineName] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toast = useToast();

  const handleMachineName = (e) => {
    setMachineName(e.target.value);
  };

  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    try {
      await createMachine({
        machineName: machineName,
        duration: duration,
      });
      toast({
        title: 'Request Sent',
        description: 'Machine has been created successfully',
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
    handleMachineName,
    handleDuration,
    handleSubmit,
    isLoadingButton,
    machineName,
    duration,
  };
};
export default useMachineForm;
