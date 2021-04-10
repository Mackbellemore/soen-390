import { makeGetRequest, makePostRequest } from './base.js';

const getProductions = async () => {
  return makeGetRequest('productions');
};

const postProductions = async (body) => {
  return makePostRequest('productions', body);
};

export { getProductions, postProductions };
