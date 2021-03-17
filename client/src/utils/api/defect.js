import { makeGetRequest, makePostRequest, makeDeleteRequest } from './base.js';

const getDefects = async () => {
  return makeGetRequest('defects');
};

const createDefect = async (body) => {
  return makePostRequest('defects', body);
};

const deleteDefects = async (body) => {
  return makeDeleteRequest('defects', body);
};

export { getDefects, createDefect, deleteDefects };
