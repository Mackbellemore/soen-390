import React from 'react';
import { MapContext } from 'react-map-gl';
import ShippingMap from '../Shipping/Map.jsx';
import ShippingTable from '../Shipping/ShippingTable.jsx';

const ShippingPage = () => {
  return (
    <>
      <MapContext.Provider>
        <ShippingMap />
        <ShippingTable />
      </MapContext.Provider>
    </>
  );
};

export default ShippingPage;
