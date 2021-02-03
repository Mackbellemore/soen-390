import { Button, Flex, FormLabel, Icon, Input, Text, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { GrLock, GrMailOption } from 'react-icons/gr';

function Login() {
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'post',
      url: 'http://localhost:9090/user/login',
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      withCredentials: true,
    };

    try {
      const response = await axios(options);
      if (response.status === 200) {
        router.push('/main');
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

  const TextStyled = styled(Text)`
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 900;
    font-style: normal;
    text-align: left;
    width: 100%;
    max-width: 380px;
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
      <Container>
        <TextStyled>Log in</TextStyled>
        <InputContainer>
          <Flex alignItems="center">
            <InputIcon as={GrMailOption} />
          </Flex>
          <Flex direction="column">
            <FormLabel>Email address</FormLabel>
            <UnstyledInput type="email" focusBorderColor={{}} ref={emailRef} />
          </Flex>
        </InputContainer>
        <InputContainer>
          <Flex alignItems="center">
            <InputIcon as={GrLock} />
          </Flex>
          <Flex direction="column">
            <FormLabel>Password</FormLabel>
            <UnstyledInput type="password" focusBorderColor={{}} ref={passwordRef} />
          </Flex>
        </InputContainer>
        <Flex direction="row" width="100%" maxWidth="380px">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={false}
            type="submit"
            width="100%"
            maxWidth="380px"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Login
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default Login;
