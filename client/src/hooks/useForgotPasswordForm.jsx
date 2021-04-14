import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useEmailValidation from 'hooks/useEmailValidation.jsx';
import { userForgotPassword } from 'utils/api/users.js';

const useForgotPasswordForm = () => {
  const emailRef = useRef('');
  const [emailIsValidated, setEmailIsValidated] = useState(true);
  const [humanIsValidated, setHumanIsValidated] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAnEmail } = useEmailValidation();

  const forgotPasswordHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = emailRef.current.value;
    const url = window.location.origin;

    try {
      await userForgotPassword({
        email: email,
        url: url,
      });
    } catch (err) {
      // User Not Found, but do not tell it to the user.
      console.error('Fail for the email request');
    }

    toast({
      title: 'Request Sent',
      description: 'The request has been sent to ' + email,
      status: 'success',
      duration: 9000,
      isClosable: true,
      onCloseComplete: onClose,
    });

    setIsLoading(false);
  };

  // Validates email
  const forgotPasswordHandleEmailValidation = (e) => {
    if (!isAnEmail(e.target.value)) {
      setEmailIsValidated(true);
      setButtonIsDisabled(true);
    } else {
      setEmailIsValidated(false);
      if (humanIsValidated === false) setButtonIsDisabled(false);
    }
  };

  // Validates human
  const forgotPasswordHandleHumanValidation = (e) => {
    if (e.target.checked === true) {
      setHumanIsValidated(false);
      if (emailIsValidated === false) setButtonIsDisabled(false);
    } else {
      setHumanIsValidated(true);
      setButtonIsDisabled(true);
    }
  };

  return {
    emailRef,
    emailIsValidated,
    buttonIsDisabled,
    isLoading,
    forgotPasswordHandleSubmit,
    forgotPasswordHandleEmailValidation,
    forgotPasswordHandleHumanValidation,
    isOpen,
    onOpen,
    onClose,
  };
};

export default useForgotPasswordForm;
