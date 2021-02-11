// Config package binds the config/default.js file
import config, { IConfig } from 'config';
import { Container } from 'inversify';

// Utils
import winston, { Logger } from 'winston';
import { MongoConnection } from './utils/MongoConnection';
import TYPES from './constants/types';

// Controllers import autobinds them to the application
import './controllers/BikeController';
import './controllers/PartController';
import './controllers/UserController';
import './controllers/MaterialController';

// Services (make sure to bind it to a singleton)
import { UserService } from './services/UserService';
import { MaterialService } from './services/MaterialService';
import { PartService } from './services/PartService';
import { BikeService } from './services/BikeService';

// Repositories
import { UserRepository } from './repository/UserRepository';
import { MaterialRepository } from './repository/MaterialRepository';
import { PartRepository } from './repository/PartRepository';
import { BikeRepository } from './repository/BikeRepository';

const logger: Logger = winston.createLogger({});
// Just for dev purposes now
logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

// Global container
const container = new Container();

container.bind<IConfig>(TYPES.config).toConstantValue(config);
container.bind<Logger>(TYPES.logger).toConstantValue(logger);

// Mongo
const mongoConnection = new MongoConnection(config);
container.bind<MongoConnection>(TYPES.MongoConnection).toConstantValue(mongoConnection);

// Services
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<PartService>(TYPES.PartService).to(PartService).inSingletonScope();
container.bind<MaterialService>(TYPES.MaterialService).to(MaterialService).inSingletonScope();
container.bind<BikeService>(TYPES.BikeService).to(BikeService).inSingletonScope();

// Repository
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<PartRepository>(TYPES.PartRepository).to(PartRepository).inSingletonScope();
container
  .bind<MaterialRepository>(TYPES.MaterialRepository)
  .to(MaterialRepository)
  .inSingletonScope();
container.bind<BikeRepository>(TYPES.BikeRepository).to(BikeRepository).inSingletonScope();

export { container };
