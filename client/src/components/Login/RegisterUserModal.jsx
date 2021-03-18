import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FormButton } from 'components/common/Button.jsx';
import { rolesAvailable } from 'constants.js';
import useRegisterForm from 'hooks/useRegisterForm.jsx';
import React, { Fragment } from 'react';
import { Text } from '../common/Typography.jsx';

const ValidationText = styled(Text)`
  font-size: 10px;
  padding-left: 12px;
`;

const RegisterUserModal = () => {
  const {
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
  } = useRegisterForm();

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
