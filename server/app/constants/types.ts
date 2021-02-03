const TYPES = {
  BikeService: Symbol.for('BikeService'),
  UserService: Symbol.for('UserService'),
  config: Symbol.for('config'),
  logger: Symbol.for('logger'),
  BikeRepository: Symbol.for('BikeRepository'),
  UserRepository: Symbol.for('UserRepository'),
  MongoConnection: Symbol.for('MongoConnection'),
};

export default TYPES;
