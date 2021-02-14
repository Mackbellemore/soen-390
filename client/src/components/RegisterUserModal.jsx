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
import { StyledButton } from './views/Login';
import { Text } from './common/Typography';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

const RegisterUserModal = () => {
  const registerUsernameRef = useRef('');
  const registerPasswordRef = useRef('');
  const registerEmailRef = useRef('');
  const [registerPasswordIsValidated, registerSetPasswordIsValidated] = useState(false);
  const [registerPasswordBorderColor, registerSetPasswordBorderColor] = useState('blue.500');
  const [registerUsernameIsValidated, registerSetUsernameIsValidated] = useState(false);
  const [registerUsernameBorderColor, registerSetUsernameBorderColor] = useState('blue.500');
  const [registerButtonIsDisabled, registerSetButtonIsDisabled] = useState(false);
  const toast = useToast();
  const [registerIsLoading, registerSetIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ValidationText = styled(Text)`
    font-size: 10px;
    padding-left: 12px;
  `;

  const registerHandleSubmit = (e) => {
    e.preventDefault();
    registerSetIsLoading(true);
    toast({
      title: 'Request Sent',
      description:
        'The request has been sent, you will receive an email when the account has been created',
      status: 'success',
      duration: 9000,
      isClosable: true,
      onCloseComplete: onClose,
    });
    // some logic to send request here
    registerSetIsLoading(false);
  };
  // Validates Password
  const registerHandlePasswordValidation = (e) => {
    const pass = e.target.value;
    // min 8 characters one uppercase, one lowercase, one number, one special character
    const regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    const isOk = regex.test(pass);
    if (!isOk) {
      registerSetPasswordIsValidated(true);
      registerSetPasswordBorderColor('red');
      registerSetButtonIsDisabled(true);
    } else {
      registerSetPasswordIsValidated(false);
      registerSetPasswordBorderColor('blue.500');
      registerSetButtonIsDisabled(false);
    }
  };
  // Validates Username
  const registerHandleUsernameValidation = (e) => {
    const username = e.target.value;
    // any number of characters followed by @ followed by any number of characters followed by a . then any number of characters
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const isOk = regex.test(username);
    if (!isOk) {
      registerSetUsernameIsValidated(true);
      registerSetUsernameBorderColor('red');
      registerSetButtonIsDisabled(true);
    } else {
      registerSetUsernameIsValidated(false);
      registerSetUsernameBorderColor('blue.500');
      registerSetButtonIsDisabled(false);
    }
  };

  return (
    <>
      <StyledButton colorScheme="green" onClick={onOpen}>
        Request an account
      </StyledButton>

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
                ref={registerEmailRef}
                focusBorderColor={registerUsernameBorderColor}
                isInvalid={registerUsernameIsValidated}
                onChange={registerHandleUsernameValidation}
                required
              />
              <Input
                mb={4}
                placeholder="Create Username"
                size="sm"
                ref={registerUsernameRef}
                required
              />
              <Input
                placeholder="Create Password"
                size="sm"
                type="password"
                focusBorderColor={registerPasswordBorderColor}
                isInvalid={registerPasswordIsValidated}
                onChange={registerHandlePasswordValidation}
                ref={registerPasswordRef}
                required
              />
              <ValidationText>
                Password must be Minimum eight characters, at least one uppercase letter, one
                lowercase letter, one number and one special character:
              </ValidationText>
              <Select my={4} placeholder="Select Role" required>
                <option value="Admin">Admin</option>
                <option value="General">General</option>
              </Select>
            </ModalBody>

            <ModalFooter justifyContent="center">
              <StyledButton
                type="submit"
                disabled={registerButtonIsDisabled}
                colorScheme="green"
                isLoading={registerIsLoading}
                loadingText="Request Submitted"
              >
                Send Request
              </StyledButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default RegisterUserModal;
