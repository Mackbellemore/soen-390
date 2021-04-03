import { Heading } from '@chakra-ui/react';
import Head from 'next/head';

const PlanningHeader = () => (
  <>
    <Head>
      <title>ERP - Planning</title>
    </Head>
    <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
      Planning
    </Heading>
  </>
);

const Planning = () => {
  return (
    <>
      <PlanningHeader />
    </>
  );
};

export default Planning;
