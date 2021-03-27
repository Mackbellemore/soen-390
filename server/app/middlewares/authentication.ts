import { IUserEntity } from './../entities/User';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { NON_AUTH_PATHS } from '../constants/common';

/**
 * AuthenticateJWT Middleware:
 * This middleware is a function that is ran before any request reaches any controller
 * that requires authentication. This function intercepts the request and response object
 * so that we can verify the token passed in the request. The token we are verifying is a json web token
 * that holds the user information and the expiry all encoded. If the token is missing or
 * is invalid, this middleware will return a 403 unauthorized response. If the token is valid
 * then the middleware calls the next() function which allows the API request to continue to the controller
 * and access the resources.
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  if (req.path.includes('/doc')) return next();
  if (NON_AUTH_PATHS.includes(req.path)) return next();

  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    res.status(403).send('you are missing an Authorization Header along with the bearer token');
    return;
  }
  const token = bearerHeader.split(' ')[1];

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

    req.body.user = decoded;

    return next();
  });
};

// function use to generate a jwt for a given user
export function generateToken(user: IUserEntity): string {
  return jwt.sign(user, config.get<string>('jwt.secret'), {
    expiresIn: config.get<string>('jwt.expiry'),
  });
}
