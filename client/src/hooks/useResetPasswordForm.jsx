import { useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import usePasswordValidation from 'hooks/usePasswordValidation';
import { userResetPassword } from 'utils/api/users.js';
const useResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordRef = useRef('');
  const confirmResetPasswordRef = useRef('');
  const toast = useToast();
  const { isGoodPassword } = usePasswordValidation();

  const resetPasswordHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (resetPasswordRef.current.value !== confirmResetPasswordRef.current.value) {
      toast({
        title: 'ERROR',
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
        title: 'FAILED',
        description:
          'The password need minimum 8 characters one uppercase, one lowercase, one number, one special character',
        status: 'error',
        duration: 10000,
        isClosable: true,
      });

      setIsLoading(false);
    } else {
      const pass = resetPasswordRef.current.value;
      const token = window.location.href.split('/').pop();

      try {
        await userResetPassword({
          token,
          pass,
        });
        toast({
          title: 'SUCCESS',
          description: 'The passwords has been reset',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem('jwt', '');
      } catch (err) {
        toast({
          title: 'FAILED',
          description: 'An error has occured, please try to send another request \n ' + err,
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
