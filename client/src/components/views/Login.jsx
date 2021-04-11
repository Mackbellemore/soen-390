import { Flex, useToast, Divider } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GrLock, GrMailOption } from 'react-icons/gr';
import { useHistory, Redirect } from 'react-router-dom';
import { RootStoreContext } from 'stores/stores.jsx';
import { userLogin } from 'utils/api/users.js';
import { Heading, Text } from '../common/Typography.jsx';
import RegisterUserModal from 'components/Login/RegisterUserModal.jsx';
import ForgotPasswordModal from 'components/Login/ForgotPasswordModal.jsx';
import { FormButton } from '../common/Button.jsx';
import {
  BackgroundImageContainer,
  StyledForm,
  Container,
  InputContainer,
  UnstyledInput,
  InputIcon,
  StyledFormLabel,
} from '../common/Form.jsx';
import useLoggedInUser from 'hooks/useLoggedInUser.jsx';
import Loader from '../common/Loader.jsx';
import PropTypes from 'prop-types';

const Login = ({ location: { state } }) => {
  const { userStore } = useContext(RootStoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRenderForm, setShouldRenderForm] = useState(true);
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const history = useHistory();
  const toast = useToast();
  const { isCheckDone } = useLoggedInUser();

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setShouldRenderForm(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await userLogin({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem('jwt', res.data.jwt);

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

  if (!isCheckDone) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>ERP - Login</title>
      </Head>
      {shouldRenderForm ? (
        <>
          <BackgroundImageContainer>
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
              <ForgotPasswordModal />
              <Divider
                orientation="horizontal"
                borderColor="#D4D4D4"
                opacity="1"
                width="90%"
                mt={5}
              />
              <Text mt={4} fontSize="12px">
                New User?
              </Text>
              <RegisterUserModal />
            </Container>
          </BackgroundImageContainer>
        </>
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

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
