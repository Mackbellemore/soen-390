import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const makeRequest = async (method, endpoint, body = {}, params = {}) => {
  const token = localStorage.getItem('jwt');
  const options = {
    method: method,
    url: `${apiUrl}/${endpoint}`,
    data: body,
    params: params,
    headers: {
      Authorization: `Basic ${token}`,
    },
  };

  const response = await axios(options);
  return response;
};

const makeGetRequest = async (endpoint) => {
  return makeRequest('get', endpoint);
};

const makePostRequest = async (endpoint, body = {}) => {
  return makeRequest('post', endpoint, body);
};

const makeDeleteRequest = async (endpoint, body = {}) => {
  return makeRequest('delete', endpoint, body);
};

const makePatchRequest = async (endpoint, body = {}, params = {}) => {
  return makeRequest('patch', endpoint, body, params);
};

export { makeGetRequest, makePostRequest, makeDeleteRequest, makePatchRequest };
