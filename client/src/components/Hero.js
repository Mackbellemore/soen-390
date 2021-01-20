import { Flex, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const Hero = ({ title }) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading fontSize="10vw">{title}</Heading>
  </Flex>
);

Hero.defaultProps = {
  title: 'with-chakra-ui',
};

Hero.propTypes = {
  title: PropTypes.string,
};
