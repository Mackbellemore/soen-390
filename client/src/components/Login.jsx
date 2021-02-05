import { Button, Flex, FormLabel, Icon, Input, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useContext, useRef, useState } from 'react';
import { GrLock, GrMailOption } from 'react-icons/gr';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { RootStoreContext } from '../stores/stores';
import { makeRequest } from '../utils/api';
import { Heading } from './common/Typography';

const Login = () => {
  const { uiStore } = useContext(RootStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const history = useHistory();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await makeRequest('post', 'user/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (response.status === 200) {
        uiStore.userLogIn();
        history.push('/main');
      }
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

  const Container = styled.div`
    width: 100%;
    height: 456px;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
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

  return (
    <>
      <BrowserRouter>
        <Container>
          <Heading size="lg" textAlign="left" width="100%" maxWidth="380px">
            Log in
          </Heading>
          <InputContainer>
            <Flex alignItems="center">
              <InputIcon as={GrMailOption} />
            </Flex>
            <Flex direction="column">
              <FormLabel>Email address</FormLabel>
              <UnstyledInput type="email" focusBorderColor="none" ref={emailRef} />
            </Flex>
          </InputContainer>
          <InputContainer>
            <Flex alignItems="center">
              <InputIcon as={GrLock} />
            </Flex>
            <Flex direction="column">
              <FormLabel>Password</FormLabel>
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
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Flex>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default Login;
