import React from 'react';
import Head from 'next/head';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Heading } from '@chakra-ui/react';
import Schedulings from 'components/SchedulingPage/Schedulings';

const SchedulingPage = () => {
  return (
    <>
      <Head>
        <title>ERP - Schedulings</title>
      </Head>
      <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
        Schedulings
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Schedulings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Schedulings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default SchedulingPage;
