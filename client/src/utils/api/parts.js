import { makeGetRequest } from './base.js';

const getParts = async () => {
  return makeGetRequest('parts');
};

export { getParts };
