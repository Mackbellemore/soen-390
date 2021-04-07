import { makeGetRequest } from './base.js';

const getParts = async () => {
  return makeGetRequest('parts');
};

const getMaterialList = async () => {
  return makeGetRequest('parts/materialList');
};

export { getParts, getMaterialList };
