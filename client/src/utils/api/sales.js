import { makeGetRequest, makePatchRequest, makePostRequest } from './base.js';

const ENDPOINT = 'sales';

const getSales = async () => {
  return makeGetRequest(ENDPOINT);
};

const updateSale = async (body) => {
  return makePatchRequest(ENDPOINT, body);
};

const createSale = async (body) => {
  return makePostRequest(ENDPOINT, body);
};

export { getSales, updateSale, createSale };
