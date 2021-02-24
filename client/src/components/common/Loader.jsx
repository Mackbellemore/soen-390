import CircleLoader from 'react-spinners/CircleLoader';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

const FlexBox = styled(Flex)`
  justify-content: center;
  height: 55vh;
  align-items: center;
`;

const Loader = () => {
  return (
    <FlexBox>
      <CircleLoader color="blue" size={250} />
    </FlexBox>
  );
};

export default Loader;
