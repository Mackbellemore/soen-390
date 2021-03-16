import { makeGetRequest } from './base.js';

const getOrders = async () => {
  return makeGetRequest('orders');
};

export { getOrders };
