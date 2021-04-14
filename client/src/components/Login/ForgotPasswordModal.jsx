import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Checkbox,
} from '@chakra-ui/react';
import { FormButton } from 'components/common/Button.jsx';
import useForgotPasswordForm from 'hooks/useForgotPasswordForm.jsx';
import React from 'react';
import { Text } from '../common/Typography.jsx';

const ForgotPasswordModal = () => {
  const {
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
  } = useForgotPasswordForm();

  return (
    <>
      <Text mt={3} fontSize="13px" onClick={onOpen} style={{ cursor: 'pointer' }}>
        Forgot Password?
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={forgotPasswordHandleSubmit}>
          <ModalContent>
            <ModalHeader>Forgot Password</ModalHeader>
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
                onChange={forgotPasswordHandleEmailValidation}
                required
              />
              <Checkbox onChange={forgotPasswordHandleHumanValidation} required>
                I am a human
              </Checkbox>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <FormButton
                type="submit"
                disabled={buttonIsDisabled}
                colorScheme="green"
                isLoading={isLoading}
                loadingText="Request Submitted"
              >
                Request
              </FormButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
