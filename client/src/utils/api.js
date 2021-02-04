import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const makeRequest = async (method, endpoint, body = {}) => {
  const options = {
    method: method,
    url: `${apiUrl}/${endpoint}`,
    data: body,
    withCredentials: true,
  };

  const response = await axios(options);
  return response;
};
