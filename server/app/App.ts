import { MongoConnection } from './utils/MongoConnection';
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
import cors from 'cors';

export class App {
  private config: IConfig;
  private app: Application;
  private listener: Server;
  public logger: Logger;

  constructor() {
    this.config = container.get<IConfig>(TYPES.config);
    this.logger = container.get<Logger>(TYPES.logger);
  }

  public init(): void {
    try {
      const appBuilder = new InversifyExpressServer(container);

      MongoConnection.initConnection()
        .then(() => {
          return MongoConnection.setAutoReconnect();
        })
        .catch((e) => {
          throw e;
        });

      appBuilder.setConfig((server: Application) => {
        // middlewares
        server.use(cors());
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
}
