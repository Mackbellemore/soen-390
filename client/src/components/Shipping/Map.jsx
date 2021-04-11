import React, { useEffect, useState, useRef } from 'react';
import ReactMapGL, { Layer, Marker, Source } from 'react-map-gl';
import { createRoutes } from 'utils/api/mapbox.js';
import { IoLocationSharp } from 'react-icons/io5';
import { FaWarehouse } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { mapLayerID, shippingStatesHide, hq } from 'constants.js';
import { getDestinations, getShipment } from 'utils/shippingFunctions.js';
import useShippingTable from 'hooks/useShippingTable.jsx';

const IconLoc = styled(Icon)`
  width: 20px;
  height: 20px;
  color: red;
`;

const IconHq = styled(Icon)`
  width: 20px;
  height: 20px;
`;

const ShippingMap = () => {
  const { isLoading, data } = useShippingTable();

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '40vh',
    latitude: 45.4644455,
    longitude: -73.745181,
    zoom: 8,
  });

  const mapRef = useRef('map');

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const getMapRoutes = async () => {
      const dest = getDestinations(data.data);
      setDestinations(await createRoutes(dest));
    };
    if (data) {
      getMapRoutes();
    }
  }, [data]);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        width="100%"
      >
        {!isLoading && data.data.length && destinations.length
          ? destinations.map((dest) => {
              const status = getShipment(data.data, dest._id)?.status;
              return status ? (
                <div key={dest._id}>
                  <Source key={'source' + dest._id} type="geojson" data={dest.route}>
                    <Layer
                      id={mapLayerID + dest._id}
                      key={mapLayerID + dest._id}
                      {...dest.routeStyle}
                      layout={{
                        visibility: shippingStatesHide.includes(status) ? 'none' : 'visible',
                      }}
                    />
                  </Source>
                  <Marker
                    key={'marker' + dest._id}
                    longitude={dest.destCoor.longitude}
                    latitude={dest.destCoor.latitude}
                    offsetLeft={-10}
                    offsetTop={-10}
                  >
                    <IconLoc as={IoLocationSharp} />
                  </Marker>
                </div>
              ) : null;
            })
          : null}

        <Marker longitude={hq.longitude} latitude={hq.latitude} offsetLeft={-10} offsetTop={-10}>
          <IconHq as={FaWarehouse} />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default ShippingMap;
