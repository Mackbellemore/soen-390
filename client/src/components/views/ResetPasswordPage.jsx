import React, { useContext, useEffect, useRef, useState } from 'react';
import { Flex, FormLabel, Icon, Input, Box, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { GrLock } from 'react-icons/gr';
import { useHistory, Redirect } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { Heading } from '../common/Typography.jsx';
import { FormButton } from '../common/Button.jsx';
import { StyledForm } from '../common/Form.jsx';

import axios from 'axios';

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

const ResetPasswordPage = (props) => {
  const { userStore } = useContext(RootStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRenderForm, setShouldRenderForm] = useState(true);
  const resetPasswordRef = useRef('');
  const confirmResetPasswordRef = useRef('');
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setShouldRenderForm(false);
    }
  }, []);

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

    const token = window.location.href.split('/').pop();
    console.log('token: ' + token);

    // RESET PASSWORD

    toast({
      title: 'SUCESS',
      description: 'The passwords has been reseted',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>ERP - Reset Password</title>
      </Head>
      {shouldRenderForm ? (
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
      ) : (
        <Redirect
          to={{
            pathname: state?.referrer === undefined ? '/main' : state.referrer,
          }}
        />
      )}
    </>
  );
};

export default ResetPasswordPage;
