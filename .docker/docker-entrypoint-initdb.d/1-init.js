db.createUser({
  user: "example",
  pwd: "example",
  roles: [
    {
      role: "readWrite",
      db: "app_db",
    },
  ],
});

db = new Mongo().getDB("app_db");

db.bikes.insert([
  {
    description: "carbon road bike",
    weight: 4,
    color: "blue",
  },
  {
    description: "steel road bike",
    weight: 24,
    color: "red",
  },
  {
    description: "aluminum road bike",
    weight: 14,
    color: "",
  },
  {
    description: "small dutch bike",
    weight: 25,
    color: "beige",
  },
]);

db.materials.insert([
  {
    description: "steel",
    name: "steel",
    stock: 5,
    weight: "kg",
    price: 5,
  },
  {
    description: "copper",
    name: "copper",
    stock: 15,
    weight: "kg",
    price: 3,
  },
  {
    description: "plastic",
    name: "plastic",
    stock: 25,
    weight: "kg",
    price: 1,
  },
  {
    description: "aluminum",
    name: "aluminum",
    stock: 35,
    weight: "kg",
    price: 10,
  },
]);
