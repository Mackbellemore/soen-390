import { makeGetRequest } from './base.js';

const getBikes = async () => {
  return makeGetRequest('bikes');
};

export { getBikes };
