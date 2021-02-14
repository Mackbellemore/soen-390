import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { IUserEntity } from './../entities/User';

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  if (!config.get<boolean>('server.authEnabled')) return next();

  const jwtCookie = req.cookies.jwt;

  if (!jwtCookie) res.status(403);

  jwt.verify(jwtCookie, config.get<string>('jwt.secret'), function (
    err: jwt.JsonWebTokenError | jwt.NotBeforeError | jwt.TokenExpiredError | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decoded: any | IUserEntity
  ) {
    if (err) {
      return res.sendStatus(403);
    }

    if (!(decoded.username && decoded.email && decoded.id && decoded.role)) res.sendStatus(403);

    if (decoded.role !== 'Admin') {
      return res.sendStatus(403);
    }

    return next();
  });
};
