let error = true;

let res = [
  db.bikes.drop(),
  db.bikes.insert({
    description: "carbon road bike",
    weight: 4,
    color: "blue",
  }),
  db.bikes.insert({
    description: "steel road bike",
    weight: 24,
    color: "red",
  }),
  db.bikes.insert({
    description: "aluminum road bike",
    weight: 14,
    color: "",
  }),
  db.bikes.insert({
    description: "small dutch bike",
    weight: 25,
    color: "beige",
  }),
];

printjson(res);

if (error) {
  print("Error, exiting");
  quit(1);
}
