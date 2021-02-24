import { Heading } from '@chakra-ui/react';
import Head from 'next/head';

const NoAccess = () => {
  return (
    <>
      <Head>
        <title>ERP - Unauthorized</title>
      </Head>
      <Heading size="xl" textAlign="center" mt={5}>
        You do not have access to this page
      </Heading>
    </>
  );
};

export default NoAccess;
