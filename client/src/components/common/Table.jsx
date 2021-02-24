import { Tr, Th, Td } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledTableHeader = styled(Th)`
  text-align: center;
`;

export const StyledTableCell = styled(Td)`
  text-align: center;
`;

export const StyledTableRow = styled(Tr)`
  &:hover {
    background-color: #d6d6d6;
  }
`;
