const getDestinations = (shippings) => {
  return shippings.map((shpmt) => {
    return {
      _id: shpmt._id,
      location: shpmt.location,
    };
  });
};

const getShipment = (shippings, _id) => {
  return shippings.find((shpmt) => {
    return String(shpmt._id) === String(_id);
  });
};

export { getDestinations, getShipment };
