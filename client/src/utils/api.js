import axios from 'axios';

export const makeGetRequest = async (slug) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(`${apiUrl}/${slug}`);
  return data;
};
