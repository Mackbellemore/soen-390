import { Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

const MainDashboard = () => {
  return (
    <>
      <Head>
        <title>ERP - Dashboard</title>
      </Head>
      <Flex margin="2rem">
        <Heading>Welcome back</Heading>
      </Flex>
    </>
  );
};

export default MainDashboard;
