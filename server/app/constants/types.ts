const TYPES = {
  BikeService: Symbol.for('BikeService'),
  UserService: Symbol.for('UserService'),
  config: Symbol.for('config'),
  logger: Symbol.for('logger'),
  BikeRepository: Symbol.for('BikeRepository'),
  UserRepository: Symbol.for('UserRepository'),
  MaterialRepository: Symbol.for('MaterialRepository'),
  MongoConnection: Symbol.for('MongoConnection'),
  MaterialService: Symbol.for('MaterialService'),
};

export default TYPES;
