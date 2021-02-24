import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Head from 'next/head';
import Materials from './inventory items/Materials';
import Parts from './inventory items/Parts';
import Bikes from './inventory items/Bikes';

const Inventory = () => {
  return (
    <>
      <Head>
        <title>ERP - Inventory</title>
      </Head>
      <Tabs>
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
            <Bikes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Inventory;
