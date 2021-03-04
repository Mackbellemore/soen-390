import { Image } from '@chakra-ui/react';
import Head from 'next/head';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>ERP - Not Found</title>
      </Head>
      <Image src="/images/404.png" alt="404" width="50%" margin="auto" />
    </>
  );
};

export default NotFound;
