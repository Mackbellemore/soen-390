import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Head from 'next/head';
import Materials from './inventory items/Materials';

const Inventory = () => {
  return (
    <>
      <Head>
        <title>ERP - Inventory</title>
      </Head>
      <Tabs isManual variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Materials</Tab>
          <Tab>Component</Tab>
          <Tab>Product</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Materials />
          </TabPanel>
          <TabPanel>
            <p> component table here </p>
          </TabPanel>
          <TabPanel>
            <p> product table here </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Inventory;
