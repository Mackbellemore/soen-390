import React, { useRef, useState } from 'react';
import { Flex, FormLabel, Icon, Input, Box, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { GrLock } from 'react-icons/gr';
import { Heading, Text } from '../common/Typography.jsx';
import { FormButton } from '../common/Button.jsx';
import { StyledForm } from '../common/Form.jsx';
import { userResetPassword } from 'utils/api/users.js';

const ValidationText = styled(Text)`
  font-size: 10px;
  padding-left: 12px;
  width: 400px;
`;

const Container = styled(Box)`
  width: 100%;
  height: 456px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  align-items: center;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 10px;
  max-width: 560px;
`;

const InputContainer = styled(Flex)`
  flex-direction: row;
  background-color: white;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  width: 100%;
  max-width: 380px;
  font-family: Montserrat;
  font-size: 14px;
`;

const UnstyledInput = styled(Input)`
  border: none;
`;

const InputIcon = styled(Icon)`
  width: 30px;
  height: 30px;
  margin: 15px;
`;

const StyledFormLabel = styled(FormLabel)`
  padding: 0 1rem;
  margin-top: 10px;
  margin-bottom: unset;
  color: #9c9c9c;
  font-size: 12px;
`;

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordRef = useRef('');
  const confirmResetPasswordRef = useRef('');
  const toast = useToast();

  const handleSubmit = async (e) => {
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

    // min 8 characters one uppercase, one lowercase, one number, one special character
    const regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    const isOk = regex.test(resetPasswordRef.current.value);

    if (!isOk) {
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
          title: 'SUCESS',
          description: 'The passwords has been reset',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: 'FAILED',
          description: 'An error has occured, please try to send another request',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>ERP - Reset Password</title>
      </Head>
      <Container top={{ base: '66%', sm: '50%' }}>
        <Heading size="lg" textAlign="left" width="100%" maxWidth="380px" pb={8}>
          Reset Password
        </Heading>
        <StyledForm onSubmit={handleSubmit}>
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
            Password must be Minimum eight characters, at least one uppercase letter, one lowercase
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
