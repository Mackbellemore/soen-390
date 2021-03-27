const getDestinations = (shippings) => {
  return shippings.map((shpmt) => {
    return {
      _id: shpmt._id,
      location: shpmt.location,
    };
  });
};

const getShippingIds = (shippings) => {
  return shippings.map((shpmt) => {
    return shpmt._id;
  });
};

const getShipment = (shippings, _id) => {
  return shippings.find((shpmt) => {
    return String(shpmt._id) === String(_id);
  });
};

export { getDestinations, getShippingIds, getShipment };
