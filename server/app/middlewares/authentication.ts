import { IUserEntity } from './../entities/User';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { NON_AUTH_PATHS } from '../constants/common';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  if (NON_AUTH_PATHS.includes(req.path)) return next();

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

    if (!decoded.username || !decoded.email || !decoded.id) res.sendStatus(403);
    delete decoded.exp;
    delete decoded.iat;

    const newAccessToken = generateToken(decoded);
    res.cookie('jwt', newAccessToken, { httpOnly: true, sameSite: 'none' });

    return next();
  });
};

export function generateToken(user: IUserEntity): string {
  return jwt.sign(user, config.get<string>('jwt.secret'), {
    expiresIn: config.get<string>('jwt.expiry'),
  });
}
