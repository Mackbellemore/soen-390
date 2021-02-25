import { makeGetRequest } from './base.js';

const getMaterials = async () => {
  return makeGetRequest('materials');
};

export { getMaterials };
