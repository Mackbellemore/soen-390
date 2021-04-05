import { makePostRequest } from './base.js';

const baseEndpoint = 'system';

const sendEmail = async (body) => {
  console.log('system.sendMail()');
  console.log('system.' + `${baseEndpoint}/email`);
  console.log('system.' + body);
  return makePostRequest(`${baseEndpoint}/email`, body);
};

export { sendEmail };
