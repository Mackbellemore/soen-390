// Inversify stuff
import { Container } from 'inversify';
import TYPES from './constants/types';

// Config package binds the config/default.js file
import config, { IConfig } from 'config';

// Controllers import autobinds them to the application
import './controllers/BikeController';
import './controllers/UserController';
import './controllers/SystemController';

// Services
import { BikeService } from './services/BikeService';
import { UserService } from './services/UserService';
import { SystemService } from './services/SystemService';

// repositories
import { BikeRepository } from './repository/BikeRepository';
import { UserRepository } from './repository/UserRepository';

// utils
import winston, { Logger } from 'winston';
import { MongoConnection } from './utils/MongoConnection';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const logger: Logger = winston.createLogger({});
// just for dev purposes now
logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get<string>('email'),
    pass: process.env.EMAIL_PASS,
  },
});

// Global container
const container = new Container();

container.bind<IConfig>(TYPES.config).toConstantValue(config);
container.bind<Logger>(TYPES.logger).toConstantValue(logger);
container.bind<Mail>(TYPES.Mail).toConstantValue(transporter);

const mongoConnection = new MongoConnection(config);
container.bind<MongoConnection>(TYPES.MongoConnection).toConstantValue(mongoConnection);

container.bind<BikeService>(TYPES.BikeService).to(BikeService).inSingletonScope();
container.bind<BikeRepository>(TYPES.BikeRepository).to(BikeRepository).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<SystemService>(TYPES.SystemService).to(SystemService).inSingletonScope();

export { container };
