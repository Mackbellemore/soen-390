import styled from '@emotion/styled';
import { Flex, FormLabel, Icon, Input, Box } from '@chakra-ui/react';
import { Text } from '../common/Typography.jsx';

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ValidationText = styled(Text)`
  font-size: 10px;
  padding-left: 12px;
  width: 400px;
`;

export const Container = styled(Box)`
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

export const InputContainer = styled(Flex)`
  flex-direction: row;
  background-color: white;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  width: 100%;
  max-width: 380px;
  font-family: Montserrat;
  font-size: 14px;
`;

export const UnstyledInput = styled(Input)`
  border: none;
`;

export const InputIcon = styled(Icon)`
  width: 30px;
  height: 30px;
  margin: 15px;
`;

export const StyledFormLabel = styled(FormLabel)`
  padding: 0 1rem;
  margin-top: 10px;
  margin-bottom: unset;
  color: #9c9c9c;
  font-size: 12px;
`;
