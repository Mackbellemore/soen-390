const TYPES = {
  config: Symbol.for('config'),
  logger: Symbol.for('logger'),

  // Service
  BikeService: Symbol.for('BikeService'),
  UserService: Symbol.for('UserService'),
  PartService: Symbol.for('PartService'),

  // Repository
  BikeRepository: Symbol.for('BikeRepository'),
  UserRepository: Symbol.for('UserRepository'),
  PartRepository: Symbol.for('PartRepository'),

  // MongoDB
  MongoConnection: Symbol.for('MongoConnection'),
};

export default TYPES;
