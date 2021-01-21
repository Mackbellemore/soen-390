// Inversify stuff
import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './constants/types';

// Config package binds the config/default.js file
import config, { IConfig } from 'config';

// Controllers import autobinds them to the application
import './controllers/Home';

// Services
import { HomeService } from './services/HomeService';

// logger (this is temporary, I created a ticket to actually setup proper logging)
import winston, { Logger } from 'winston';

const logger: Logger = winston.createLogger({});
// just for dev purposes now
logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

// Global container
const container = new Container();

container.bind<IConfig>(TYPES.config).toConstantValue(config);
container.bind<Logger>(TYPES.logger).toConstantValue(logger);

container.bind<HomeService>(TYPES.HomeService).to(HomeService).inSingletonScope();
export { container };
