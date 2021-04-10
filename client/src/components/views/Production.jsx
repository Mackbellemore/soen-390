import ProductionTable from 'components/Production/ProductionTable.jsx';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';

const Productions = () => {
  return (
    <>
      <Head>
        <title>ERP - Production Page</title>
      </Head>
      <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
        Production
      </Heading>
      <ProductionTable />
    </>
  );
};

export default Productions;
