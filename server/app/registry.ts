/**
 * This file is used to setup our dependency injection container provided by inversifyJS.
 * Any class, function, logger etc that needs to be injected annywhere in our app is first
 * binded in our container and can then be injected.
 */

// Config package binds the config/default.js file
import config, { IConfig } from 'config';
import { Container } from 'inversify';

// Utils
import winston, { Logger } from 'winston';
import { MongoConnection } from './utils/MongoConnection';
import TYPES from './constants/types';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

// Controllers import autobinds them to the application
import './controllers/BikeController';
import './controllers/PartController';
import './controllers/UserController';
import './controllers/SystemController';
import './controllers/MaterialController';
import './controllers/OrderController';
import './controllers/SchedulingController';

// Services (make sure to bind it to a singleton)
import { UserService } from './services/UserService';
import { SystemService } from './services/SystemService';
import { MaterialService } from './services/MaterialService';
import { PartService } from './services/PartService';
import { BikeService } from './services/BikeService';
import { OrderService } from './services/OrderService';
import { SchedulingService } from './services/SchedulingService';

// Repositories
import { UserRepository } from './repository/UserRepository';
import { MaterialRepository } from './repository/MaterialRepository';
import { PartRepository } from './repository/PartRepository';
import { BikeRepository } from './repository/BikeRepository';
import { OrderRepository } from './repository/OrderRepository';
import { SchedulingRepository } from './repository/SchedulingRepository';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore because types don't exist for this library
import LogdnaWinston from 'logdna-winston';

/**
 * @constant logger
 * This is our app logger that can be used to log any specific actions that are not reflected by our access
 * logger defined in App.ts middlewares.
 */
const logger: Logger = winston.createLogger({});

logger.add(
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    format: winston.format.simple(),
  })
);

const isDeployed =
  config.get<string>('zeetEnv') === 'main' || config.get<string>('zeetEnv') === 'develop';

// only log to Logdna, our third part logging manager when deployed to save resources.
if (isDeployed) {
  logger.add(new LogdnaWinston(config.get<string>('logdna')));
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get<string>('email.user'),
    pass: config.get<string>('email.pass'),
  },
});

// Global container
const container = new Container();

container.bind<IConfig>(TYPES.config).toConstantValue(config);
container.bind<Logger>(TYPES.logger).toConstantValue(logger);
container.bind<Mail>(TYPES.Mail).toConstantValue(transporter);

// Mongo
const mongoConnection = new MongoConnection(config);
container.bind<MongoConnection>(TYPES.MongoConnection).toConstantValue(mongoConnection);

// Services
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<PartService>(TYPES.PartService).to(PartService).inSingletonScope();
container.bind<SystemService>(TYPES.SystemService).to(SystemService).inSingletonScope();
container.bind<MaterialService>(TYPES.MaterialService).to(MaterialService).inSingletonScope();
container.bind<BikeService>(TYPES.BikeService).to(BikeService).inSingletonScope();
container.bind<OrderService>(TYPES.OrderService).to(OrderService).inSingletonScope();
container.bind<SchedulingService>(TYPES.SchedulingService).to(SchedulingService).inSingletonScope();

// Repository
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<PartRepository>(TYPES.PartRepository).to(PartRepository).inSingletonScope();
container
  .bind<MaterialRepository>(TYPES.MaterialRepository)
  .to(MaterialRepository)
  .inSingletonScope();
container.bind<BikeRepository>(TYPES.BikeRepository).to(BikeRepository).inSingletonScope();
container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepository).inSingletonScope();
container
  .bind<SchedulingRepository>(TYPES.SchedulingRepository)
  .to(SchedulingRepository)
  .inSingletonScope();

export { container };
