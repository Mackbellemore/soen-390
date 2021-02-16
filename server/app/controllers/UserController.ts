import { IUserEntity } from './../entities/User';
import { UserService } from './../services/UserService';
import { generateToken } from '../middlewares/authentication';
import { Request } from 'express';
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
  public async login(req: Request): Promise<results.JsonResult> {
    try {
      const user: IUserEntity = await this.userService.loginUser(req.body);

      const response = {
        user,
        jwt: '',
      };

      if (config.get<boolean>('server.authEnabled')) {
        const accessToken = generateToken(user);
        response.jwt = accessToken;
      }

      return this.json(response);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  @httpGet('/authCheck')
  public async checkAuth(): Promise<results.JsonResult> {
    return this.json(200);
  }
}
