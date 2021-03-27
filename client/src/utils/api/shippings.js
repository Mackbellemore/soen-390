import { makeDeleteRequest, makeGetRequest, makePatchRequest, makePostRequest } from './base.js';
const ENDPOINT = 'shipping';

// const mockData = [
//   {
//     _id: 1,
//     status: 'Delivered',
//     company: 'abc',
//     location: 'Toronto',
//     shippingDate: '01/01/2021',
//     deliveryDate: '01/01/2021',
//   },
//   {
//     _id: 2,
//     status: 'Shipped',
//     company: 'abc',
//     location: 'Los Angeles, California',
//     shippingDate: '01/01/2021',
//     deliveryDate: '01/01/2021',
//   },
//   {
//     _id: 3,
//     status: 'Shipped',
//     company: 'abc',
//     location: 'Washington, DC',
//     shippingDate: '01/01/2021',
//     deliveryDate: '01/01/2021',
//   },
//   {
//     _id: 4,
//     status: 'Shipped',
//     company: 'abc',
//     location: 'Quebec, QC',
//     shippingDate: '01/01/2021',
//     deliveryDate: '01/01/2021',
//   },
// ];

const getShippings = () => {
  return makeGetRequest(ENDPOINT);
};

const updateShipmentStatus = (body) => {
  return makePatchRequest(ENDPOINT, body);
};

const deleteShipment = (body) => {
  return makeDeleteRequest(ENDPOINT, body);
};

const createShipment = (body) => {
  return makePostRequest(ENDPOINT, body);
};

export { getShippings, createShipment, deleteShipment, updateShipmentStatus };
