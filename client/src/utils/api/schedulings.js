import { makeGetRequest, makePostRequest, makeDeleteRequest } from './base.js';

const getSchedulings = async () => {
  return makeGetRequest('scheduling');
};

const createScheduling = async (body) => {
  return makePostRequest('scheduling', body);
};

const deleteSchedulings = async (body) => {
  return makeDeleteRequest('scheduling', body);
};

export { getSchedulings, createScheduling, deleteSchedulings };
