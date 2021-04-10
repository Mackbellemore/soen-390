import { useToast } from '@chakra-ui/react';
import { useState, useRef, useContext } from 'react';
import { useQuery } from 'react-query';
import { createMachine, getMachines } from 'utils/api/machines.js';
import { sendEmail } from 'utils/api/system.js';
import { RootStoreContext } from 'stores/stores.jsx';

const useMachineForm = () => {
  const { refetch } = useQuery('machine', getMachines);
  const { userStore } = useContext(RootStoreContext);

  // Modal (add new machine)
  const [machineName, setMachineName] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const status = useRef('');
  const toast = useToast();

  const handleMachineName = (e) => {
    setMachineName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    try {
      const { data: machineInfo } = await createMachine({
        machineName: machineName,
        status: status.current.value,
      });

      if (machineInfo.status === 'Maintenance') {
        await sendEmail({
          to: [userStore.email],
          subject: `ERP Machine: New Machine ${machineInfo._id}`,
          emailBody: `Information about the new machine\n\nMachine Name: ${machineInfo.machineName} \nStatus: ${machineInfo.status}`,
        });
      }

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
    handleSubmit,
    isLoadingButton,
    machineName,
    status,
  };
};
export default useMachineForm;
