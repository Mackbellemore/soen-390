import React from 'react';
import Head from 'next/head';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Heading } from '@chakra-ui/react';
import Bikes from '../QualityManagement/Bikes.jsx';
import Parts from '../QualityManagement/Parts.jsx';

const QualityManagement = () => {
  return (
    <>
      <Head>
        <title>ERP - Quality Management</title>
      </Head>
      <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
        Quality Management
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Parts</Tab>
          <Tab>Bikes</Tab>
        </TabList>
        <TabPanels>
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
export default QualityManagement;
