db.createUser({
  user: 'example',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'app_db',
    },
  ],
});

db = new Mongo().getDB('app_db');
db.materials.createIndex({ name: 1 }, { unique: true });
db.parts.createIndex({ name: 1 }, { unique: true });
db.email.createIndex({ email: 1 }, { unique: true });

db.bikes.insert([
  {
    description: 'carbon road bike',
    weight: 4,
    color: 'blue',
  },
  {
    description: 'steel road bike',
    weight: 24,
    color: 'red',
  },
  {
    description: 'aluminum road bike',
    weight: 14,
    color: '',
  },
  {
    description: 'small dutch bike',
    weight: 25,
    color: 'beige',
  },
]);

db.materials.insert([
  {
    description: 'steel',
    name: 'steel',
    stock: 1000,
    weight: 'kg',
    price: 5,
  },
  {
    description: 'rubber',
    name: 'rubber',
    stock: 1000,
    weight: 'kg',
    price: 77,
  },
  {
    description: 'leather',
    name: 'leather',
    stock: 1000,
    weight: 'kg',
    price: 44,
  },
  {
    description: 'copper',
    name: 'copper',
    stock: 1000,
    weight: 'kg',
    price: 3,
  },
  {
    description: 'plastic',
    name: 'plastic',
    stock: 1000,
    weight: 'kg',
    price: 1,
  },
  {
    description: 'aluminum',
    name: 'aluminum',
    stock: 1000,
    weight: 'kg',
    price: 10,
  },
]);

db.parts.insert([
  {
    name: 'handle-bar3000',
    quality: 'aluminium',
    type: 'handle_bar',
    color: 'red',
    stock: 1000,
    costPrice: 10,
  },
  {
    name: 'fast-wheels',
    quality: 'aluminium',
    type: 'wheels',
    color: 'red',
    stock: 1000,
    costPrice: 12,
  },
  {
    name: 'drip',
    quality: 'aluminium',
    type: 'chain',
    color: 'red',
    stock: 1000,
    costPrice: 7,
  },
  {
    name: 'nice-frame',
    quality: 'aluminium',
    type: 'frame',
    color: 'red',
    stock: 1000,
    costPrice: 9,
  },
  {
    name: 'pedal-4u',
    quality: 'aluminium',
    type: 'pedal',
    color: 'red',
    stock: 1000,
    costPrice: 6,
  },
  {
    name: 'breaks',
    quality: 'aluminium',
    type: 'brakes',
    color: 'red',
    stock: 1000,
    costPrice: 14,
  },
  {
    name: 'seet',
    quality: 'aluminium',
    type: 'seat',
    color: 'red',
    stock: 1000,
    costPrice: 21,
  },
  {
    name: 'knife',
    quality: 'aluminium',
    type: 'fork',
    color: 'red',
    stock: 1000,
    costPrice: 26,
  },
]);
