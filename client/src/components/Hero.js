/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
import { Flex, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const Hero = ({ title }) => {
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      fetch(baseUrl).then((data) => {
        setSubtitle(`Request to backend :9090 status: ${data.status}`);
      });
    };
    fetchData();
  }, []);

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
      <Heading fontSize="10vw">{title}</Heading>
      <Heading>{subtitle}</Heading>
    </Flex>
  );
};

Hero.defaultProps = {
  title: 'with-chakra-ui',
};

Hero.propTypes = {
  title: PropTypes.string,
};
