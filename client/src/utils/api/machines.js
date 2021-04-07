import { makeGetRequest, makePostRequest, makeDeleteRequest } from './base.js';

const getMachines = async () => {
  return makeGetRequest('machine');
};

const createMachine = async (body) => {
  return makePostRequest('machine', body);
};

const deleteMachine = async (body) => {
  return makeDeleteRequest('machine', body);
};

export { getMachines, createMachine, deleteMachine };
