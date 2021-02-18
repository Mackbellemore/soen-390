import { makeGetRequest } from '../../api.js';

const getBikes = async () => {
  return makeGetRequest('bikes');
};

export { getBikes };
