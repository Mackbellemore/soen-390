import { makePostRequest } from './base.js';

const baseEndpoint = 'system';

const sendEmail = async (body) => {
  return makePostRequest(`${baseEndpoint}/email`, body);
};

export { sendEmail };
