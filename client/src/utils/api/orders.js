import { makeGetRequest } from './base.js';

const getOrders = async () => {
  return makeGetRequest('orders');
};

const postOrders = async (body) => {
  return makePostRequest('orders', body);
};

export { getOrders, postOrders };
