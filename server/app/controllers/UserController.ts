import { IUserEntity } from './../entities/User';
import { UserService } from './../services/UserService';
import { generateToken, sendAuthCookie } from '../middlewares/authentication';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  BaseHttpController,
  results,
  httpPost,
  httpGet,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import config from 'config';
import { checkAdminRole } from '../middlewares/authorization';

@controller('/user')
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @httpPost('/register')
  public async register(req: Request): Promise<results.JsonResult> {
    try {
      const user: IUserEntity = await this.userService.registerUser(req.body);
      return this.json(user);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  @httpPost('/login')
  public async login(req: Request, res: Response): Promise<results.JsonResult> {
    try {
      const user: IUserEntity = await this.userService.loginUser(req.body);

      if (config.get<boolean>('server.authEnabled')) {
        const accessToken = generateToken(user);
        sendAuthCookie(res, accessToken);
      }

      return this.json({
        user,
      });
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  @httpPost('/logout')
  public async logout(_req: Request, res: Response): Promise<results.JsonResult> {
    try {
      sendAuthCookie(res, '');

      return this.json(200);
    } catch (err) {
      console.log(err);
      return this.json(err.message, 400);
    }
  }

  @httpGet('/authCheck')
  public async checkAuth(): Promise<results.JsonResult> {
    return this.json(200);
  }

  @httpGet('/', checkAdminRole)
  public async get(): Promise<results.JsonResult> {
    try {
      const users: IUserEntity[] = await this.userService.getUsers();
      return this.json(users);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }
}
