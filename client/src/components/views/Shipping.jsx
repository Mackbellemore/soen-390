import React, { useContext, useState, useEffect } from 'react';
import { MapContext } from 'react-map-gl';
import ShippingMap from '../Map';
import ShippingTable from '../ShippingTable';
import { getShippingData } from 'utils/api/shippings.js';
import { RootStoreContext } from 'stores/stores.jsx';
import Head from 'next/head';
const ShippingPage = () => {
  const { shippingStore } = useContext(RootStoreContext);
  shippingStore.setShippingData(getShippingData());

  return (
    <>
      <Head>
        <title>ERP - Shipping</title>
      </Head>
      <MapContext.Provider>
        <ShippingMap />
        <ShippingTable />
      </MapContext.Provider>
    </>
  );
};

export default ShippingPage;
