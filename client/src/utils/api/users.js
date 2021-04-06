import { makeGetRequest, makePostRequest, makeDeleteRequest, makePatchRequest } from './base.js';

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

const userForgotPassword = async (body) => {
  return makePostRequest(`${baseEndpoint}/forgot`, body);
};

const userResetPassword = async (body) => {
  return makePostRequest(`${baseEndpoint}/reset`, body);
};

const getUsers = async () => {
  return makeGetRequest(baseEndpoint);
};

const deleteUser = async (body) => {
  return makeDeleteRequest(baseEndpoint, body);
};

const updateUser = async (body, username) => {
  return makePatchRequest(`${baseEndpoint}/${username}`, body);
};

export {
  userLogin,
  userRegister,
  userAuthCheck,
  getUsers,
  deleteUser,
  updateUser,
  userForgotPassword,
  userResetPassword,
};
