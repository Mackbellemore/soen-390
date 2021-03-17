import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactMapGL, { Layer, Marker, Source } from 'react-map-gl';
import { createRoutes } from 'utils/api/mapbox.js';
import { IoLocationSharp } from 'react-icons/io5';
import { FaWarehouse } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { RootStoreContext } from 'stores/stores.jsx';
import { mapLayerID, shippingStatesHide, hq } from 'constants.js';
import { observer } from 'mobx-react-lite';

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
  const { shippingStore } = useContext(RootStoreContext);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '40vh',
    latitude: 45.4644455,
    longitude: -73.745181,
    zoom: 8,
  });

  const [updateMap, setUpdateMap] = useState(true);
  const mapRef = useRef('map');

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const getMapRoutes = async () => {
      if (updateMap) {
        const dest = shippingStore.getDestinations;
        setDestinations(await createRoutes(dest));
        setUpdateMap(false);
      }
    };
    getMapRoutes();
  }, [updateMap, shippingStore.getDestinations]);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {destinations.length !== 0
          ? destinations.map((dest) => (
              <div key={dest._id}>
                <Source key={'source' + dest._id} type="geojson" data={dest.route}>
                  <Layer
                    id={mapLayerID + dest._id}
                    key={mapLayerID + dest._id}
                    {...dest.routeStyle}
                    layout={{
                      visibility: shippingStatesHide.includes(shippingStore.shpmtStatus(dest._id))
                        ? 'none'
                        : 'visible',
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
            ))
          : null}

        <Marker longitude={hq.longitude} latitude={hq.latitude} offsetLeft={-10} offsetTop={-10}>
          <IconHq as={FaWarehouse} />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default observer(ShippingMap);
