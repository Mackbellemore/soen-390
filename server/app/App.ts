import { MaterialRepository } from './repository/MaterialRepository';
import { authenticateJWT } from './middlewares/authentication';
import 'reflect-metadata';
import winston, { Logger } from 'winston';
import expressWinston from 'express-winston';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './registry';
import { Application } from 'express';
import { IConfig } from 'config';
import * as bodyParser from 'body-parser';
import { Server } from 'http';
import TYPES from './constants/types';
import { BikeRepository } from './repository/BikeRepository';
import { UserRepository } from './repository/UserRepository';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export class App {
  private config: IConfig;
  private app: Application;
  private listener: Server;
  public logger: Logger;

  constructor() {
    this.config = container.get<IConfig>(TYPES.config);
    this.logger = container.get<Logger>(TYPES.logger);
  }

  public async init(): Promise<void> {
    try {
      const appBuilder = new InversifyExpressServer(container);

      await this.initRepositories();
      this.logger.info('mongoDB connection initialized');

      appBuilder.setConfig((server: Application) => {
        // middlewares
        server.use(
          cors({
            credentials: true,
            origin: ['http://localhost:3000', /soen-390-team-07\.netlify\.app$/],
          })
        );
        server.use(cookieParser());
        server.use(
          bodyParser.urlencoded({
            extended: true,
          })
        );
        server.use(bodyParser.json());
        server.use(
          expressWinston.logger({
            transports: [new winston.transports.Console()],
            meta: false,
            expressFormat: true,
            statusLevels: true,
          })
        );
        if (this.config.get<boolean>('server.authEnabled')) {
          server.all('*', authenticateJWT);
        }
      });

      this.app = appBuilder.build();
    } catch ({ message }) {
      this.logger.error(message);
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    try {
      if (!this.app) {
        throw new Error('app failed to initialize');
      }
      const port = this.config.get<number>('server.port');

      this.listener = this.app.listen(port, () => {
        this.logger.info(`Service booted on port ${port}`);
      });
    } catch ({ message }) {
      this.logger.error(message);
      process.exit(1);
    }
  }

  public async close(): Promise<void> {
    try {
      this.listener.close();
    } catch ({ message }) {
      this.logger.error(message);
      process.exit(1);
    }
  }

  private async initRepositories(): Promise<void> {
    this.logger.info('Initializing repositories');
    await container.get<UserRepository>(TYPES.UserRepository).initialize();
    await container.get<BikeRepository>(TYPES.BikeRepository).initialize();
    await container.get<MaterialRepository>(TYPES.MaterialRepository).initialize();
  }
}
