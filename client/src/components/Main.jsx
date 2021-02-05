import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React from 'react';
import MainDashboard from './MainDashboard';

const Main = observer(() => {
  return (
    <>
      <Head>
        <title>ERP - Main</title>
      </Head>
      <MainDashboard />
    </>
  );
});

export default Main;
