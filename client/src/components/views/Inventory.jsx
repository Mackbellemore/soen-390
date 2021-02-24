import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Head from 'next/head';
import Materials from './inventory items/Materials';
import Parts from './inventory items/Parts';

const Inventory = () => {
  return (
    <>
      <Head>
        <title>ERP - Inventory</title>
      </Head>
      <Tabs isManual variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Materials</Tab>
          <Tab>Parts</Tab>
          <Tab>Product</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Materials />
          </TabPanel>
          <TabPanel>
            <Parts />
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
