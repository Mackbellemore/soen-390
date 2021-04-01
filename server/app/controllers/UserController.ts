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
import { wrappedCheckRole } from '../middlewares/authorization';
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

  @Doc('Log a user')
  /**
   * @desc        Login user
   * @route       POST /user/login
   * @access      Public
   * @param req
   * @returns     User JSON Format + Jwt token
   */
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

  @Doc('Authentication Check')
  /**
   * @desc        Authentication Check
   * @route       Get /user/authCheck
   * @access      Public
   * @param _req
   * @param res
   * @returns     User JSON Format
   */
  @httpGet('/authCheck')
  public async checkAuth(_req: Request, res: Response): Promise<results.JsonResult> {
    const user = res.locals?.user;
    if (user) {
      return this.json(user);
    }
    return this.json(200);
  }

  @Doc('Check Admin Role')
  /**
   * @desc        Check Admin User
   * @route       Get /user
   * @access      Public
   * @returns     User JSON Format
   */
  @httpGet('/', wrappedCheckRole([]))
  public async get(): Promise<results.JsonResult> {
    try {
      const users: IUserEntity[] = await this.userService.getUsers();
      return this.json(users);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  @Doc('Delete User')
  /**
   * @desc          Delete User
   * @route         Delete /user
   * @access        Public
   * @param request
   * @returns       User JSON Format
   */
  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const user: IUserEntity | null = await this.userService.deleteUser(request.body);
      return this.json(user);
    } catch (err) {
      return this.json(err.message, 404);
    }
  }

  @Doc('Update User')
  /**
   * @desc          Update username
   * @route         PATCH /user/:username
   * @access        Public
   * @param request
   * @returns       User JSON Format
   */
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
