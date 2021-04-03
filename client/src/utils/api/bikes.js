import { makeGetRequest } from './base.js';

const getBikes = async () => {
  return makeGetRequest('bikes');
};

const getOneBike = async (id) => {
  return makeGetRequest(`bikes/${id}`);
};

export { getBikes, getOneBike };
