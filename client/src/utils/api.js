import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const makeRequest = async (method, endpoint, body = {}) => {
  // const token = localStorage.getItem('jwt');
  // const headers = {
  //   Authorization: `Basic ${token}`,
  // };
  const options = {
    method: method,
    url: `${apiUrl}/${endpoint}`,
    data: body,
  };

  const response = await axios(options);
  return response;
};
