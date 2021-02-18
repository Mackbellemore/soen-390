import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledButton = styled(Button)`
  width: 100%;
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 500;
`;

export const FormButton = styled(StyledButton)`
  max-width: 380px;
`;

export const TableButton = styled(StyledButton)`
  max-width: 100px;
`;
