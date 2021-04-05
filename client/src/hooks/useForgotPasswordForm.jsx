import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useEmailValidation from 'hooks/useEmailValidation.jsx';
import { userForgotPassword } from 'utils/api/users.js';
import { v1 as uuidv1 } from 'uuid';
import { sendEmail } from 'utils/api/system.js';

const useForgotPasswordForm = () => {
  const emailRef = useRef('');
  const [emailIsValidated, setEmailIsValidated] = useState(true);
  const [humanIsValidated, setHumanIsValidated] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAnEmail } = useEmailValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forgotPasswordHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = emailRef.current.value;

    try {
      const id = uuidv1();
      await userForgotPassword({
        id,
        email: email,
      });
      toast({
        title: 'Request Sent',
        description: 'The request has been sent to ' + email,
        status: 'success',
        duration: 9000,
        isClosable: true,
        onCloseComplete: onClose,
      });

      const url = window.location.href.substr(0, window.location.href.lastIndexOf('/'));

      // Send email
      try {
        await sendEmail({
          to: [email],
          subject: 'ERP Password Reset',
          emailBody: `Reset your password using the following link: ${url}/reset/${id}`,
        });
        toast({
          title: 'Email',
          description: 'Email Sent',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: 'Error',
          description: 'An error occured while sending the email',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No user found',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    setIsSubmitting(false);
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
