import { useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { createDefect, getDefects } from 'utils/api/defect.js';

const useDefectForm = () => {
  const { refetch } = useQuery('defects', getDefects);

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
