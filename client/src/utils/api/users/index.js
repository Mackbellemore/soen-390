import { makeGetRequest, makePostRequest } from '../../api.js';

const baseEndpoint = 'user';

const userAuthCheck = async () => {
  return makeGetRequest(`${baseEndpoint}/authCheck`);
};

const userRegister = async (body) => {
  return makePostRequest(`${baseEndpoint}/register`, body);
};

const userLogin = async (body) => {
  return makePostRequest(`${baseEndpoint}/login`, body);
};

const getUsers = async () => {
  return makeGetRequest(baseEndpoint);
};

export { userLogin, userRegister, userAuthCheck, getUsers };
