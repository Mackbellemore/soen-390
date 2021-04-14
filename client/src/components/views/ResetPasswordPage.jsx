import React from 'react';
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { GrLock } from 'react-icons/gr';
import { Heading } from '../common/Typography.jsx';
import { FormButton } from '../common/Button.jsx';
import {
  StyledForm,
  ValidationText,
  Container,
  InputContainer,
  UnstyledInput,
  InputIcon,
  StyledFormLabel,
} from '../common/Form.jsx';
import useResetPasswordForm from 'hooks/useResetPasswordForm.jsx';

const ResetPasswordPage = () => {
  const {
    resetPasswordHandleSubmit,
    resetPasswordRef,
    confirmResetPasswordRef,
    isLoading,
  } = useResetPasswordForm();

  return (
    <>
      <Head>
        <title>ERP - Reset Password</title>
      </Head>
      <Container top={{ base: '66%', sm: '50%' }}>
        <Heading size="lg" textAlign="left" width="100%" maxWidth="380px" pb={8}>
          Reset Password
        </Heading>
        <StyledForm onSubmit={resetPasswordHandleSubmit}>
          <InputContainer>
            <Flex alignItems="center">
              <InputIcon as={GrLock} />
            </Flex>
            <Flex direction="column">
              <StyledFormLabel px={4}>Password</StyledFormLabel>
              <UnstyledInput type="password" focusBorderColor="none" ref={resetPasswordRef} />
            </Flex>
          </InputContainer>
          <ValidationText>
            Password must be minimum eight characters, at least one uppercase letter, one lowercase
            letter, one number and one special character:
          </ValidationText>
          <InputContainer mt={7}>
            <Flex alignItems="center">
              <InputIcon as={GrLock} />
            </Flex>
            <Flex direction="column">
              <StyledFormLabel>Confirm Password</StyledFormLabel>
              <UnstyledInput
                type="password"
                focusBorderColor="none"
                ref={confirmResetPasswordRef}
              />
            </Flex>
          </InputContainer>
          <Flex direction="row" width="100%" maxWidth="380px">
            <FormButton mt={5} colorScheme="blue" isLoading={isLoading} type="submit">
              Reset Password
            </FormButton>
          </Flex>
        </StyledForm>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
