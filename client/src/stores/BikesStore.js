import { action, makeObservable, observable } from 'mobx';
import { makeGetRequest } from '../utils/api.js';

class BikesStore {
  bikes = [];

  endpoint = 'bikes';

  constructor() {
    makeObservable(this, {
      bikes: observable,
      setBikes: action,
    });
  }

  async fetchAll() {
    const response = await makeGetRequest(`${this.endpoint}`);
    this.setBikes(response);
  }

  setBikes(bikes) {
    this.bikes = bikes;
  }
}

export default BikesStore;
