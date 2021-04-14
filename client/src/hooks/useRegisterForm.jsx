import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { userRegister } from 'utils/api/users.js';
import useEmailValidation from 'hooks/useEmailValidation.jsx';
import usePasswordValidation from 'hooks/usePasswordValidation';

const useRegisterForm = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const roleRef = useRef('');
  const [passwordIsNotValid, setPasswordIsNotValid] = useState(false);
  const [emailIsNotValid, setEmailIsNotValid] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAnEmail } = useEmailValidation();
  const { isGoodPassword } = usePasswordValidation();

  const registerHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await userRegister({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: roleRef.current.value,
        username: usernameRef.current.value,
      });

      toast({
        title: 'Request Sent',
        description:
          'The request has been sent, you will receive an email when the account has been approved',
        status: 'success',
        duration: 9000,
        isClosable: true,
        onCloseComplete: onClose,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Email or username already exists',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  // Validates Password
  const registerHandlePasswordValidation = (e) => {
    const pass = e.target.value;
    if (!isGoodPassword(pass)) {
      setPasswordIsNotValid(true);
      setButtonIsDisabled(true);
    } else {
      setPasswordIsNotValid(false);
      if (emailIsNotValid === false) {
        setButtonIsDisabled(false);
      }
    }
  };

  // Validates email
  const registerHandleEmailValidation = (e) => {
    const email = e.target.value;
    if (!isAnEmail(email)) {
      setEmailIsNotValid(true);
      setButtonIsDisabled(true);
    } else {
      setEmailIsNotValid(false);

      if (passwordIsNotValid === false) {
        setButtonIsDisabled(false);
      }
    }
  };

  return {
    usernameRef,
    passwordRef,
    emailRef,
    roleRef,
    passwordIsNotValid,
    emailIsNotValid,
    buttonIsDisabled,
    isLoading,
    registerHandleSubmit,
    registerHandlePasswordValidation,
    registerHandleEmailValidation,
    isOpen,
    onOpen,
    onClose,
  };
};

export default useRegisterForm;
