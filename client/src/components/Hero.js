import { Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Hero = ({ title }) => {
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      fetch(baseUrl).then((data) => {
        setSubtitle(`Request to backend :9090 status: ${data.status}`);
        console.log(data);
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
