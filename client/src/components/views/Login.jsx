import { Button, Flex, FormLabel, Icon, Input, Box, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { GrLock, GrMailOption } from 'react-icons/gr';
import { useHistory, useLocation } from 'react-router-dom';
import { RootStoreContext } from '../../stores/stores';
import { makeRequest } from '../../utils/api';
import { Heading } from '../common/Typography';

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
  margin: 5px 0;
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
  margin-top: 5px;
`;
const Login = () => {
  const { uiStore } = useContext(RootStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const history = useHistory();
  const toast = useToast();
  const [cookies, setCookie] = useCookies(['userLoggedIn']);
  const location = useLocation();

  useEffect(() => {
    const userAlreadyLoggedIn = () => {
      if (cookies.userLoggedIn === 'true' && location.pathname === '/login') {
        history.push('/main');
      }
    };

    userAlreadyLoggedIn();
  }, [cookies.userLoggedIn, history, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await makeRequest('post', 'user/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      navigator.serviceWorker.controller.postMessage({
        type: 'SET_TOKEN',
        token: res.data.jwt,
      });

      setCookie('userLoggedIn', true, { path: '/' });
      uiStore.userLogIn();
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

      emailRef.current.value = '';
      passwordRef.current.value = '';
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ERP - Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Container top={{ base: '66%', sm: '50%' }}>
          <Heading size="lg" textAlign="left" width="100%" maxWidth="380px">
            Log in
          </Heading>
          <InputContainer>
            <Flex alignItems="center">
              <InputIcon as={GrMailOption} />
            </Flex>
            <Flex direction="column">
              <StyledFormLabel padding="0 1rem">Email address</StyledFormLabel>
              <UnstyledInput type="email" focusBorderColor="none" ref={emailRef} />
            </Flex>
          </InputContainer>
          <InputContainer>
            <Flex alignItems="center">
              <InputIcon as={GrLock} />
            </Flex>
            <Flex direction="column">
              <StyledFormLabel>Password</StyledFormLabel>
              <UnstyledInput type="password" focusBorderColor="none" ref={passwordRef} />
            </Flex>
          </InputContainer>
          <Flex direction="row" width="100%" maxWidth="380px">
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={isLoading}
              type="submit"
              width="100%"
              maxWidth="380px"
            >
              Login
            </Button>
          </Flex>
        </Container>
      </form>
    </>
  );
};

export default Login;
