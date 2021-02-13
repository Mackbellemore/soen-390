import { action, makeObservable, observable } from 'mobx';
import { makeRequest } from '../utils/api.js';

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
    const response = await makeRequest('get', `${this.endpoint}`);
    this.setBikes(response);
  }

  setBikes(bikes) {
    this.bikes = bikes;
  }
}

export default BikesStore;
