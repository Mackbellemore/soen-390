import { useToast } from '@chakra-ui/react';
import { useRef, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { createScheduling, getSchedulings } from 'utils/api/schedulings.js';
import { sendEmail } from 'utils/api/system.js';
import { RootStoreContext } from 'stores/stores.jsx';
import { formatDate } from 'utils/dateFunctions.js';

const useSchedulingForm = () => {
  const { refetch } = useQuery('scheduling', getSchedulings);
  const { userStore } = useContext(RootStoreContext);

  // Modal (add new scheduling)
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');

  // theres a warning in console if its not converted so im converting from iso format to the calendar format
  // date.toIsoString format: 2021-04-01T17:16:37.800Z
  // calendar picker format: yyyy-MM-ddThh:mm
  const dateNow = new Date().toISOString();

  const formattedDate = dateNow.substr(0, dateNow.indexOf('.'));

  const [startTime, setStartTime] = useState(formattedDate);
  const [endTime, setEndTime] = useState(formattedDate);
  const frequency = useRef('');
  const partType = useRef('');
  const machineName = useRef('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toast = useToast();

  const handleQuantityInput = (e) => {
    setQuantity(e.target.value);
  };

  const handleCostInput = (e) => {
    setCost(e.target.value);
  };

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    try {
      const { data: schedulingInfo } = await createScheduling({
        partType: partType.current.value,
        quantity: quantity,
        cost: cost,
        startTime: startTime,
        endTime: endTime,
        machineName: machineName.current.value,
        frequency: frequency.current.value,
      });

      await sendEmail({
        to: [userStore.email],
        subject: `ERP Scheduling: New Scheduling ${schedulingInfo._id}`,
        emailBody: `Information about the new scheduling\n\nMachine: ${
          schedulingInfo.machineName
        }\nPart: ${schedulingInfo.partType}\nMachine: ${schedulingInfo.machineName}\nQuantity: ${
          schedulingInfo.quatity
        }\nCost: ${schedulingInfo.cost}\nStart Time: ${formatDate(
          schedulingInfo.startTime
        )}\nEnd Time: ${formatDate(schedulingInfo.endTime)} \nFrequency: ${
          schedulingInfo.frequency
        }`,
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
    handleStartTime,
    handleEndTime,
    handleSubmit,
    isLoadingButton,
    quantity,
    cost,
    startTime,
    endTime,
    frequency,
    partType,
    machineName,
  };
};
export default useSchedulingForm;
