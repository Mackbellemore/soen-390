import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const makeRequest = async (method, endpoint, body = {}) => {
  const options = {
    method: method,
    url: `${apiUrl}/${endpoint}`,
    data: body,
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

export { makeGetRequest, makePostRequest };
