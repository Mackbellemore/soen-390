import { makeGetRequest, makePostRequest, makeDeleteRequest, makePatchRequest } from './base.js';
const ENDPOINT = 'defects';

const getDefects = async () => {
  return makeGetRequest(ENDPOINT);
};

const getBikeDefects = async () => {
  return makeGetRequest(ENDPOINT + '/bikes');
};

const createDefect = async (body) => {
  return makePostRequest(ENDPOINT, body);
};

const updateDefect = async (body) => {
  return makePatchRequest(ENDPOINT, body);
};

const deleteDefects = async (body) => {
  return makeDeleteRequest(ENDPOINT, body);
};

export { getDefects, getBikeDefects, createDefect, updateDefect, deleteDefects };
