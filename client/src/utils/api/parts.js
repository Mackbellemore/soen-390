import { makeGetRequest } from './base.js';

const getParts = async () => {
  return makeGetRequest('parts');
};

const getPartMaterialList = async () => {
  return makeGetRequest('parts/materialList');
};

export { getParts, getPartMaterialList };
