import 'reflect-metadata';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore types don't exist for the logdna-winston library
import LogdnaWinston from 'logdna-winston';
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
  public server: Application;
  private listener: Server;
  private port?: number;
  public logger: Logger;

  constructor(port?: number) {
    this.config = container.get<IConfig>(TYPES.config);
    this.logger = container.get<Logger>(TYPES.logger);
    this.port = port;
  }

  // Function to initialize database and setup express application without starting it.
  public async init(): Promise<void> {
    try {
      const appBuilder = new InversifyExpressServer(container);

      // initialize all our mongodb collections
      await this.initRepositories();
      this.logger.info('mongoDB connection initialized');

      const whitelistOrigins = [/http:\/\/localhost.*$/, /soen-390-team-07\.netlify\.app$/];

      const options = {
        console: {
          level: 'debug',
          handleExceptions: true,
          format: winston.format.prettyPrint({ colorize: true }),
        },
        logdna: this.config.get<string>('logdna'),
      };

      const loggerTransports = [new winston.transports.Console(options.console)];

      expressWinston.requestWhitelist.push('body');
      expressWinston.responseWhitelist.push('body');

      const isDeployed =
        this.config.get<string>('zeetEnv') === 'main' ||
        this.config.get<string>('zeetEnv') === 'develop';

      // only log to Logdna when were deployed, i.e. when zeet env is main or develop
      if (isDeployed) {
        loggerTransports.push(new LogdnaWinston(options.logdna));
      }

      appBuilder.setConfig((server: Application) => {
        // middlewares
        server.use(
          cors({
            credentials: true,
            origin: whitelistOrigins,
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
            expressFormat: true,
            meta: isDeployed,
            transports: loggerTransports,
          })
        );

        // Adds our custom authentication middleware only when auth is enabled and were not running integration tests
        if (
          this.config.get<boolean>('server.authEnabled') &&
          this.config.get<string>('env') !== 'test'
        ) {
          server.all('*', authenticateJWT);
        }
      });

      this.server = appBuilder.build();
    } catch ({ message }) {
      this.logger.error(message);
      process.exit(1);
    }
  }

  // Function to start the server with a port
  public async start(): Promise<void> {
    try {
      if (!this.server) {
        throw new Error('app failed to initialize');
      }

      const configPort = this.config.get<number>('server.port');

      this.port = typeof this.port !== 'undefined' ? this.port : configPort;
      this.listener = this.server.listen(this.port, () => {
        this.logger.info(`Service booted on port ${this.port}`);
      });
    } catch ({ message }) {
      this.logger.error(message);
      process.exit(1);
    }
  }

  public async close(): Promise<void> {
    try {
      this.listener.close();
      this.logger.info(`Closing application on port ${this.port}`);
    } catch ({ message }) {
      this.logger.error(message);
      process.exit(1);
    }
  }

  // Initializes all our repository classes and creates their respective collections
  private async initRepositories(): Promise<void> {
    this.logger.info('Initializing repositories');
    await container.get<UserRepository>(TYPES.UserRepository).initialize();
    await container.get<BikeRepository>(TYPES.BikeRepository).initialize();
    await container.get<PartRepository>(TYPES.PartRepository).initialize();
    await container.get<MaterialRepository>(TYPES.MaterialRepository).initialize();
  }
}
