import { Multer } from 'multer';
import { injectable, inject } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import TYPES from '../constants/types';
import { Logger } from 'winston';

@injectable()
export class UploadMiddleware extends BaseMiddleware {
  @inject(TYPES.MulterUpload) private upload: Multer;
  @inject(TYPES.logger) private logger: Logger;

  public async handler(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    this.upload.single('file')(req, res, async () => {
      try {
        if (!req.file) {
          throw new Error('No file key provided in multipart/form-data');
        }
        this.logger.info(`Processing File ${req.file.originalname}`);
        next();
        return;
      } catch (err) {
        this.logger.warn(err.message);
        return res.status(400).send(JSON.stringify(err));
      }
    });
  }
}
