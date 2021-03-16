import { makeGetRequest } from './base.js';

const getProductions = async () => {
  return makeGetRequest('productions');
};

export { getProductions };
