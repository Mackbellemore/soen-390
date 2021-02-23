import { Flex, FormLabel, Icon, Input, Box, useToast, Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GrLock, GrMailOption } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { userLogin } from 'utils/api/users.js';
import { Heading, Text } from '../common/Typography.jsx';
import RegisterUserModal from '../RegisterUserModal.jsx';
import { FormButton } from '../common/Button.jsx';
import { StyledForm } from '../common/Form.jsx';

const Container = styled(Box)`
  width: 100%;
  height: 456px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  align-items: center;
  transform: translate(-50%, -50%);
  background-color: #fffcfc;
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

const Login = () => {
  const { userStore } = useContext(RootStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    const userAlreadyLoggedIn = () => {
      if (userStore.getHasLoggedOut === undefined) {
        history.push('/main');
      } else {
        setShouldRender(true);
      }
    };

    userAlreadyLoggedIn();
  }, [history, userStore.getHasLoggedOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await userLogin({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      navigator.serviceWorker.controller.postMessage({
        type: 'SET_TOKEN',
        token: res.data.jwt,
      });

      const { username, email, role } = res.data.user;
      userStore.setUsername(username);
      userStore.setEmail(email);
      userStore.setRole(role);

      userStore.logIn();
      history.push('/main');
    } catch {
      toast({
        position: 'top',
        title: 'An error occurred.',
        description: 'Unable to log in',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });

      passwordRef.current.value = '';
      setIsLoading(false);
    }
  };

  return (
    <>
      {shouldRender && (
        <>
          <Head>
            <title>ERP - Login</title>
          </Head>
          <Container top={{ base: '66%', sm: '50%' }}>
            <Heading size="lg" textAlign="left" width="100%" maxWidth="380px" pb={8}>
              Log in
            </Heading>
            <StyledForm onSubmit={handleSubmit}>
              <InputContainer>
                <Flex alignItems="center">
                  <InputIcon as={GrMailOption} />
                </Flex>
                <Flex direction="column">
                  <StyledFormLabel px={4}>Email address</StyledFormLabel>
                  <UnstyledInput type="email" focusBorderColor="none" ref={emailRef} />
                </Flex>
              </InputContainer>
              <InputContainer mt={7}>
                <Flex alignItems="center">
                  <InputIcon as={GrLock} />
                </Flex>
                <Flex direction="column">
                  <StyledFormLabel>Password</StyledFormLabel>
                  <UnstyledInput type="password" focusBorderColor="none" ref={passwordRef} />
                </Flex>
              </InputContainer>
              <Flex direction="row" width="100%" maxWidth="380px">
                <FormButton mt={5} colorScheme="blue" isLoading={isLoading} type="submit">
                  Login
                </FormButton>
              </Flex>
            </StyledForm>
            <Divider
              orientation="horizontal"
              borderColor="#D4D4D4"
              opacity="1"
              width="90%"
              mt={9}
            />
            <Text mt={4} fontSize="12px">
              New User?
            </Text>
            <RegisterUserModal />
          </Container>
        </>
      )}
    </>
  );
};

export default Login;
