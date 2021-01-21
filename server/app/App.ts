import { Logger } from 'winston';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './registry';
import { Application } from 'express';
import { IConfig } from 'config';
import * as bodyParser from 'body-parser';
import { Server } from 'http';
import TYPES from './constants/types';

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

      appBuilder.setConfig((server: Application) => {
        // middlewares
        server.use(
          bodyParser.urlencoded({
            extended: true,
          })
        );
        server.use(bodyParser.json());
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
