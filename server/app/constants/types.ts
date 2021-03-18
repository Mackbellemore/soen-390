const TYPES = {
  config: Symbol.for('config'),
  logger: Symbol.for('logger'),

  // Service
  BikeService: Symbol.for('BikeService'),
  UserService: Symbol.for('UserService'),
  PartService: Symbol.for('PartService'),
  MaterialService: Symbol.for('MaterialService'),
  ProductionService: Symbol.for('ProductionService'),
  DefectService: Symbol.for('DefectService'),
  OrderService: Symbol.for('OrderService'),
  SchedulingService: Symbol.for('SchedulingService'),

  // Repository
  UserRepository: Symbol.for('UserRepository'),
  PartRepository: Symbol.for('PartRepository'),
  MaterialRepository: Symbol.for('MaterialRepository'),
  BikeRepository: Symbol.for('BikeRepository'),
  ProductionRepository: Symbol.for('ProductionRepository'),
  DefectRepository: Symbol.for('DefectRepository'),
  OrderRepository: Symbol.for('OrderRepository'),
  SchedulingRepository: Symbol.for('SchedulingRepository'),

  // Mongo
  MongoConnection: Symbol.for('MongoConnection'),

  // Mail
  SystemService: Symbol.for('SystemService'),
  Mail: Symbol.for('Mail'),
};

export default TYPES;
