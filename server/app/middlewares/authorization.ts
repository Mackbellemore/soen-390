import { NextFunction, Request, Response } from 'express';
import config from 'config';

export const checkAdminRole = (_req: Request, res: Response, next: NextFunction): void => {
  if (!config.get<boolean>('server.authEnabled')) return next();

  if (res.locals?.user?.role !== 'Admin')
    res.status(403).send('Permission denied, you do not have Admin rights');

  return next();
};
