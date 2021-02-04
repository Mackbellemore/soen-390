import { Heading as ChakraHeading, Text as ChakraText } from '@chakra-ui/react';
import styled from '@emotion/styled';

const PrimaryFont = "'Montserrat', sans-serif";

export const Text = styled(ChakraText)`
  font-family: ${PrimaryFont};
`;

export const Heading = styled(ChakraHeading)`
  font-family: ${PrimaryFont};
`;
