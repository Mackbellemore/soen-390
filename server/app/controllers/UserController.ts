import { IUserEntity } from './../entities/User';
import { UserService } from './../services/UserService';
import { generateToken } from '../middlewares/authentication';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  BaseHttpController,
  results,
  httpPost,
  httpGet,
  httpDelete,
  httpPatch,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import config from 'config';
import { checkAdminRole } from '../middlewares/authorization';
import { Doc } from 'inversify-express-doc';

@controller('/user')
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @Doc('Create a user account')
  /**
   * @desc        Create user account
   * @route       POST /user/register
   * @access      Public
   * @param req   Parameters {username, email, password}
   * @returns     User JSON Format
   */
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
  public async checkAuth(_req: Request, res: Response): Promise<results.JsonResult> {
    const user = res.locals?.user;
    if (user) {
      return this.json(user);
    }
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

  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const user: IUserEntity | null = await this.userService.deleteUser(request.body);
      return this.json(user);
    } catch (err) {
      return this.json(err.message, 404);
    }
  }

  @httpPatch('/:username')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const updatedUser: IUserEntity | null = await this.userService.updateUser(
        request.params.username,
        request.body
      );
      return this.json(updatedUser);
    } catch (err) {
      return this.json(err.message, 404);
    }
  }
}
