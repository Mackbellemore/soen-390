import { makeGetRequest, makePostRequest } from './base.js';

const getAuditTrail = async () => {
  return makeGetRequest('logs');
};

const addLog = async (log) => {
  return makePostRequest('logs', log);
};

export { getAuditTrail, addLog };
