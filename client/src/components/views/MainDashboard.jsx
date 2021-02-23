import { Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from 'stores/stores.jsx';

const MainDashboard = () => {
  const { userStore } = useContext(RootStoreContext);

  return (
    <>
      <Head>
        <title>ERP - Dashboard</title>
      </Head>
      <Flex margin="2rem">
        <Heading>Welcome back {userStore.username}!</Heading>
      </Flex>
    </>
  );
};

export default observer(MainDashboard);
