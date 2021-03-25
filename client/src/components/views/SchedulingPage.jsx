import React from 'react';
import Head from 'next/head';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Heading } from '@chakra-ui/react';
import Schedulings from 'components/SchedulingPage/Schedulings';
import Machines from 'components/SchedulingPage/Machine';

const SchedulingPage = () => {
  return (
    <>
      <Head>
        <title>ERP - Production</title>
      </Head>
      <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
        Production
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Schedulings</Tab>
          <Tab>Machine</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Schedulings />
          </TabPanel>
          <TabPanel>
            <Machines />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default SchedulingPage;
