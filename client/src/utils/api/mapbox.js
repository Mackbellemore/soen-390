import axios from 'axios';
import { hq } from 'constants.js';
const mapbox = 'https://api.mapbox.com';
const token = process.env.NEXT_PUBLIC_MAPBOX;

const getDestinationCoor = async (dest) => {
  const encodeStr = encodeURI(dest);
  const options = {
    method: 'get',
    url: mapbox + '/geocoding/v5/mapbox.places/' + encodeStr + '.json',
    params: {
      access_token: token,
    },
  };
  const res = await axios(options);

  return {
    longitude: res.data.features[0].center[0],
    latitude: res.data.features[0].center[1],
  };
};

const getAllRoutes = async (dest) => {
  const destCoor = await getDestinationCoor(dest);

  const options = {
    method: 'get',
    url:
      mapbox +
      '/directions/v5/mapbox/driving/' +
      hq.longitude +
      ',' +
      hq.latitude +
      ';' +
      destCoor.longitude +
      ',' +
      destCoor.latitude,
    params: {
      overview: 'full',
      geometries: 'geojson',
      access_token: token,
    },
  };

  const res = await axios(options);

  const route = res.data.routes[0].geometry;
  const routeInfo = {
    geojson: {
      type: 'Feature',
      geometry: route,
    },
    destCoor: destCoor,
  };
  return routeInfo;
};

const createRoutes = async (destArr) => {
  const routes = destArr.map(async (dest) => {
    const route = await getAllRoutes(dest.location);

    return {
      _id: dest._id,
      destCoor: route.destCoor,
      route: {
        type: 'FeatureCollection',
        features: [route.geojson],
      },
      routeStyle: {
        type: 'line',
        paint: {
          'line-color': generateRandomColor(),
          'line-width': 5,
        },
      },
    };
  });

  return Promise.all(routes);
};

const generateRandomColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 0xfffff * 1000000)
      .toString(16)
      .slice(0, 6)
  );
};

export { createRoutes };
