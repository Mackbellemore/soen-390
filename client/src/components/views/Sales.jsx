import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import SalesTable from 'components/Sales/SalesTable.jsx';

const Sales = () => {
  return (
    <>
      <Head>
        <title>ERP - Sales</title>
      </Head>
      <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
        Sales
      </Heading>
      <SalesTable />
    </>
  );
};

export default Sales;
