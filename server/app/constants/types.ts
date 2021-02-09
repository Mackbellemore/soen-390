const TYPES = {
  BikeService: Symbol.for('BikeService'),
  UserService: Symbol.for('UserService'),
  PartService: Symbol.for('PartService'),
  config: Symbol.for('config'),
  logger: Symbol.for('logger'),
  BikeRepository: Symbol.for('BikeRepository'),
  UserRepository: Symbol.for('UserRepository'),
  PartRepository: Symbol.for('PartRepository'),
  MongoConnection: Symbol.for('MongoConnection'),
};

export default TYPES;
