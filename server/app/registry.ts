// Inversify stuff
import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './constants/types';

// Config package binds the config/default.js file
import config from 'config';
import { IConfig } from 'config';

// Controllers import autobinds them to the application
import './controllers/Home';

// Services
import { HomeService } from './services/HomeService';


// Global container
const container = new Container();

container.bind<IConfig>('config').toConstantValue(config);

container
	.bind<HomeService>(TYPES.HomeService)
	.to(HomeService)
	.inSingletonScope();

export { container };
