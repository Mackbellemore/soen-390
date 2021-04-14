import { useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import usePasswordValidation from 'hooks/usePasswordValidation';
import { userResetPassword } from 'utils/api/users.js';
import { useHistory, useParams } from 'react-router-dom';

const useResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const resetPasswordRef = useRef('');
  const confirmResetPasswordRef = useRef('');
  const toast = useToast();
  const { isGoodPassword } = usePasswordValidation();
  const { id } = useParams();

  const resetPasswordHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (resetPasswordRef.current.value !== confirmResetPasswordRef.current.value) {
      toast({
        title: 'Error',
        description: 'The passwords does not match',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const pass = resetPasswordRef.current.value;

    if (!isGoodPassword(pass)) {
      toast({
        title: 'Failed',
        description:
          'The password need minimum 8 characters one uppercase, one lowercase, one number, one special character',
        status: 'error',
        duration: 10000,
        isClosable: true,
      });

      setIsLoading(false);
    } else {
      try {
        await userResetPassword({
          token: id,
          pass,
        });
        toast({
          title: 'Success',
          description: 'The passwords has been reset',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem('jwt', '');
        history.push('/login');
      } catch {
        toast({
          title: 'Failed',
          description: 'An error has occurred, please try again',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }

    setIsLoading(false);
  };

  return {
    resetPasswordHandleSubmit,
    resetPasswordRef,
    confirmResetPasswordRef,
    isLoading,
  };
};

export default useResetPasswordForm;
