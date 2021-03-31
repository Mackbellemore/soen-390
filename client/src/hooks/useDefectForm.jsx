import { useToast } from '@chakra-ui/react';
import { useRef, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { createDefect, getDefects, getBikeDefects } from 'utils/api/defect.js';
import { sendEmail } from 'utils/api/system.js';
import { RootStoreContext } from 'stores/stores.jsx';

const useDefectForm = () => {
  const { refetch } = useQuery('defects', getDefects);
  const { refetch: refetchBikeDefects } = useQuery('bikeDefects', getBikeDefects);
  const { userStore } = useContext(RootStoreContext);

  const [partName, setPartName] = useState('');
  const type = useRef('');
  const status = useRef('');
  const description = useRef('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toast = useToast();

  const handlePartNameInput = (e) => {
    setPartName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    try {
      await createDefect({
        partName: partName,
        type: type.current.value,
        status: status.current.value,
        description: description.current.value,
      });

      toast({
        title: 'Request Sent',
        description: 'Defect has been created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      if (type.current.value === 'Broken') {
        await sendEmail({
          to: [userStore.email],
          subject: 'ERP Quality Management: New Defect',
          emailBody: `Information about the new defect\n\nPart Name: ${partName} \nType: Broken \nStatus: ${status.current.value} \nDescription: ${description.current.value}`,
        });
      }

      refetch();
      refetchBikeDefects();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    setPartName('');
    setIsLoadingButton(false);
  };

  return {
    handlePartNameInput,
    handleSubmit,
    isLoadingButton,
    type,
    status,
    description,
    partName,
  };
};

export default useDefectForm;
