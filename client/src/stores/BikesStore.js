import { action, makeObservable, observable } from 'mobx';
import { getBikes } from '../utils/api/bikes/index.js';

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
    const response = await getBikes();
    this.setBikes(response);
  }

  setBikes(bikes) {
    this.bikes = bikes;
  }
}

export default BikesStore;
