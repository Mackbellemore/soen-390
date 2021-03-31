import { makeDeleteRequest, makeGetRequest, makePatchRequest, makePostRequest } from './base.js';
const ENDPOINT = 'shipping';

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
