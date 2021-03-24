const mockData = [
  {
    _id: 1,
    status: 'Delivered',
    company: 'abc',
    location: 'Toronto',
    shippingDate: '01/01/2021',
    deliveryDate: '01/01/2021',
  },
  {
    _id: 2,
    status: 'Shipped',
    company: 'abc',
    location: 'Los Angeles, California',
    shippingDate: '01/01/2021',
    deliveryDate: '01/01/2021',
  },
  {
    _id: 3,
    status: 'Shipped',
    company: 'abc',
    location: 'Washington, DC',
    shippingDate: '01/01/2021',
    deliveryDate: '01/01/2021',
  },
  {
    _id: 4,
    status: 'Shipped',
    company: 'abc',
    location: 'Quebec, QC',
    shippingDate: '01/01/2021',
    deliveryDate: '01/01/2021',
  },
];

const getShippingData = () => {
  return mockData;
};

export { getShippingData };
