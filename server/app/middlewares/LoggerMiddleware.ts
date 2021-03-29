import { LogService } from './../services/LogService';
import TYPES from '../constants/types';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { ILog } from '../models/LogModel';
import { Logger } from 'winston';

@injectable()
export class LoggerMiddleware extends BaseMiddleware {
  @inject(TYPES.logger) private logger: Logger;
  @inject(TYPES.LogService) private logService: LogService;

  public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
    // res.on(finish) ensures that this middleware executes after the request was handled by our controllers
    res.on('finish', async () => {
      try {
        if (res.statusCode !== 200 || !['POST', 'PATCH'].includes(req.method)) return next();

        const { action, collection } = this.mapAction(req.method, req.url);
        const log = {
          action,
          email: res.locals.user.email,
          date: new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }),
          mongoCollection: collection,
        } as ILog;
        await this.logService.addLog(log);
      } catch (err) {
        this.logger.warn(`Failed to log action ${req.method} ${req.url} ${res.locals.user.email}`);
        next();
      }
    });

    next();
  }

  private mapAction(method: string, url: string) {
    // transforms 'POST /bikes' into 'Created a bike'
    if (method === 'POST') {
      const collection = url.split('/').pop();
      const singularCollection = collection?.replace(/s\s*$/, '');
      return {
        action: `Created a(n) ${singularCollection}`,
        collection,
      };
    } else {
      // PATCH
      const urlParts = url.split('/');
      const updatedEntity = urlParts.pop();
      const collection = urlParts.pop();
      const singularCollection = collection?.replace(/s\s*$/, '');
      return {
        action: `Updated ${singularCollection} identified as ${updatedEntity}`,
        collection,
      };
    }
  }
}
