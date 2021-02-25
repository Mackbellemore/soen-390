import PuffLoader from 'react-spinners/PuffLoader';
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
      <PuffLoader color="#006ee6" size={250} />
    </FlexBox>
  );
};

export default Loader;
