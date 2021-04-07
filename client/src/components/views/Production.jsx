import ProductionTable from 'components/Production/ProductionTable.jsx';
import Head from 'next/head';

const Productions = () => {
  return (
    <>
      <Head>
        <title>ERP - Production Page</title>
      </Head>

      <ProductionTable />
    </>
  );
};

export default Productions;
