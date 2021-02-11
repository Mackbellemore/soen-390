import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { IConfig } from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application } from 'express';
import expressWinston from 'express-winston';
import { Server } from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';
import winston, { Logger } from 'winston';
import TYPES from './constants/types';
import { authenticateJWT } from './middlewares/authentication';
import { container } from './registry';

// Repository
import { BikeRepository } from './repository/BikeRepository';
import { PartRepository } from './repository/PartRepository';
import { UserRepository } from './repository/UserRepository';
import { MaterialRepository } from './repository/MaterialRepository';

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
        server.use(cors({ credentials: true, origin: this.config.get<string>('origin') }));
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
    await container.get<PartRepository>(TYPES.PartRepository).initialize();
    await container.get<MaterialRepository>(TYPES.MaterialRepository).initialize();
  }
}
