import { Heading, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';

const Inactive = () => {
  return (
    <>
      <Head>
        <title>ERP - Logged Out</title>
      </Head>
      <Image src="/images/bye.png" alt="Logged out" width="40%" margin="auto" marginTop={10} />
      <Heading size="xl" textAlign="center" mt={5}>
        You&apos;ve been logged out due to inactivity!
      </Heading>
      <Text fontSize="xl" textAlign="center">
        For security reasons.
      </Text>
    </>
  );
};

export default Inactive;
