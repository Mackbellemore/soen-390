import { IUserEntity } from './../entities/User';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { NON_AUTH_PATHS } from '../constants/common';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  if (NON_AUTH_PATHS.includes(req.path)) return next();

  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    res.status(403).send('you are missing an Authorization Header along with the bearer token');
    return;
  }
  const token = bearerHeader?.split(' ')[1];

  if (!token) {
    res.status(403).send('Token missing from header');
    return;
  }

  jwt.verify(token, config.get<string>('jwt.secret'), function (
    err: jwt.JsonWebTokenError | jwt.NotBeforeError | jwt.TokenExpiredError | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decoded: any | IUserEntity
  ) {
    if (err) return res.status(403).send('Invalid jwt token');

    if (!(decoded.username && decoded.email && decoded.id && decoded.role))
      return res.status(403).send('Invalid jwt token');
    delete decoded.exp;
    delete decoded.iat;

    res.locals.user = decoded;

    return next();
  });
};

export function generateToken(user: IUserEntity): string {
  return jwt.sign(user, config.get<string>('jwt.secret'), {
    expiresIn: config.get<string>('jwt.expiry'),
  });
}
