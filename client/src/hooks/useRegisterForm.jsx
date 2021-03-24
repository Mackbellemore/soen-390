import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { userRegister } from 'utils/api/users.js';
import useEmailValidation from 'hooks/useEmailValidation.jsx';

const useRegisterForm = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const roleRef = useRef('');
  const [passwordIsValidated, setPasswordIsValidated] = useState(false);
  const [emailIsValidated, setEmailIsValidated] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAnEmail } = useEmailValidation();

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
    // min 8 characters one uppercase, one lowercase, one number, one special character
    const regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    const isOk = regex.test(pass);
    if (!isOk) {
      setPasswordIsValidated(true);
      setButtonIsDisabled(true);
    } else {
      setPasswordIsValidated(false);
      setButtonIsDisabled(false);
    }
  };

  // Validates email
  const registerHandleEmailValidation = (e) => {
    const email = e.target.value;
    if (!isAnEmail(email)) {
      setEmailIsValidated(true);
      setButtonIsDisabled(true);
    } else {
      setEmailIsValidated(false);
      setButtonIsDisabled(false);
    }
  };

  return {
    usernameRef,
    passwordRef,
    emailRef,
    roleRef,
    passwordIsValidated,
    emailIsValidated,
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
