import { Heading } from '@chakra-ui/react';
import { Fragment } from 'react';
import Head from 'next/head';
import AuditTrailTable from '../AuditTrail/AuditTrailTable.jsx';

const AuditTrail = () => {
  return (
    <>
      <Head>
        <title>ERP - Audit Trail</title>
      </Head>
      <Heading fontSize={{ base: '12px', sm: '26px' }} textAlign="center" mt={5}>
        Audit Trail
      </Heading>
      <AuditTrailTable />
    </>
  );
};

export default AuditTrail;
