import {
  Flex, Spacer, Text, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Icon
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import { GrMailOption, GrLock } from "react-icons/gr";

function Login() {

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
    background-color: #FFFCFC;
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
    border: 1px solid #D5D5D5;
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
            <UnstyledInput type="email" focusBorderColor={{}} />
          </Flex>
        </InputContainer>
        <InputContainer>
          <Flex alignItems="center">
            <InputIcon as={GrLock} />
          </Flex>
          <Flex direction="column">
            <FormLabel>Password</FormLabel>
            <UnstyledInput type="password" focusBorderColor={{}} />
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
          >
            Login
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default Login;
