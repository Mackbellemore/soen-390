import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { Text } from './common/Typography.jsx';
import React, { Fragment, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { userRegister } from 'utils/api/users.js';
import { rolesAvailable } from '../constants.js';
import { FormButton } from './common/Button.jsx';

const ValidationText = styled(Text)`
  font-size: 10px;
  padding-left: 12px;
`;

const RegisterUserModal = () => {
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

  // Validates Username
  const registerHandleEmailValidation = (e) => {
    const email = e.target.value;
    // any number of characters followed by @ followed by any number of characters followed by a . then any number of characters
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const isOk = regex.test(email);
    if (!isOk) {
      setEmailIsValidated(true);
      setButtonIsDisabled(true);
    } else {
      setEmailIsValidated(false);
      setButtonIsDisabled(false);
    }
  };

  return (
    <>
      <FormButton colorScheme="green" onClick={onOpen}>
        Request an account
      </FormButton>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={registerHandleSubmit}>
          <ModalContent>
            <ModalHeader>Request Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                mb={4}
                placeholder="Email"
                size="sm"
                type="email"
                ref={emailRef}
                focusBorderColor={emailIsValidated ? 'red' : 'blue.500'}
                isInvalid={emailIsValidated}
                onChange={registerHandleEmailValidation}
                required
              />
              <Input mb={4} placeholder="Create Username" size="sm" ref={usernameRef} required />
              <Input
                placeholder="Create Password"
                size="sm"
                type="password"
                focusBorderColor={passwordIsValidated ? 'red' : 'blue.500'}
                isInvalid={passwordIsValidated}
                onChange={registerHandlePasswordValidation}
                ref={passwordRef}
                required
              />
              <ValidationText>
                Password must be Minimum eight characters, at least one uppercase letter, one
                lowercase letter, one number and one special character:
              </ValidationText>
              <Select my={4} placeholder="Select Role" required ref={roleRef}>
                {rolesAvailable.map((role) => (
                  <Fragment key={role}>
                    <option value={role}>{role}</option>
                  </Fragment>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <FormButton
                type="submit"
                disabled={buttonIsDisabled}
                colorScheme="green"
                isLoading={isLoading}
                loadingText="Request Submitted"
              >
                Send Request
              </FormButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default RegisterUserModal;
