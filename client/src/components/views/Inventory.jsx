import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Materials from 'components/Inventory/Materials.jsx';
import Parts from 'components/Inventory/Parts.jsx';
import Bikes from 'components/Inventory/Bikes.jsx';

const Inventory = () => {
  return (
    <>
      <Head>
        <title>ERP - Inventory</title>
      </Head>
      <Heading size="xl" textAlign="center" mt={5}>
        Inventory
      </Heading>
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
