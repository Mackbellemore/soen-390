import { makeObservable, observable, action, computed } from 'mobx';

class ShippingStore {
  shippingData;

  constructor() {
    makeObservable(this, {
      shippingData: observable,
      setShippingData: action,
      getDestinations: computed,
      getDestIds: computed,
    });
  }

  setShippingData = (newData) => {
    this.shippingData = newData;
  };

  get getDestinations() {
    return this.shippingData.map((shpmt) => {
      return {
        _id: shpmt._id,
        location: shpmt.location,
      };
    });
  }

  get getDestIds() {
    return this.shippingData.map((shpmt) => {
      return shpmt._id;
    });
  }

  shpmtStatus(_id) {
    return computed(
      () =>
        this.shippingData.find((shpmt) => {
          return parseInt(shpmt._id) === parseInt(_id);
        }).status
    ).get();
  }
}

export default ShippingStore;
