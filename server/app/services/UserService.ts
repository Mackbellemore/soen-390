import { IUserEntity, UserEntity } from './../entities/User';
import { IUser } from './../models/UserModel';
import { UserRepository } from './../repository/UserRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import bcrypt from 'bcryptjs';
import { IConfig } from 'config';
import validator from 'validator';
import { BadRequestError, NotApprovedError, NotFoundError } from '../errors';
import { generateToken } from '../middlewares/authentication';
import { SystemService } from './../services/SystemService';
import { SentMessageInfo } from 'nodemailer';

const requestMap = new Map();

@injectable()
export class UserService {
  @inject(TYPES.config) private config: IConfig;
  @inject(TYPES.SystemService) private systemService: SystemService;
  constructor(@inject(TYPES.UserRepository) private userRepo: UserRepository) {}

  public async registerUser(body: IUser): Promise<IUserEntity> {
    if (!body.password) {
      throw new BadRequestError('Password missing in body');
    }

    if (!validator.isStrongPassword(body.password)) {
      throw new BadRequestError(
        'Password must contain a capital, a lower case, a number and a symbol.'
      );
    }

    const salt = await bcrypt.genSalt(this.config.get<number>('salt'));
    const hash = await bcrypt.hash(body.password, salt);
    body.password = hash;

    const user = await this.userRepo.create(body);
    return UserEntity.buildUser(user);
  }

  public async loginUser(body: IUser): Promise<IUserEntity> {
    const user: IUser = await this.userRepo.findByEmail(body);
    if (!body.password) throw new BadRequestError('Password missing in body');

    if (!user.approved) throw new NotApprovedError('User has not yet been approved');

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      throw new BadRequestError('Username or password is invalid');
    }

    return UserEntity.buildUser(user);
  }

  public async getUsers(): Promise<IUserEntity[]> {
    const users: IUser[] = await this.userRepo.getList();
    return UserEntity.buildUsers(users);
  }

  public async deleteUser(body: IUser): Promise<IUserEntity | null> {
    const deletedUser: IUser | null = await this.userRepo.deleteByEmail(body);
    if (!deletedUser) {
      throw new NotFoundError(`User with email ${body.email} was not found`);
    }
    return UserEntity.buildUser(deletedUser);
  }

  public async updateUser(username: string, body: IUser): Promise<IUserEntity> {
    const updatedUser: IUser | null = await this.userRepo.updateByUsername(username, body);
    if (!updatedUser) {
      throw new NotFoundError(`User with username ${username} was not found`);
    }
    return UserEntity.buildUser(updatedUser);
  }

  public async forgotPassword(url: string, body: IUser): Promise<string> {
    const email = body.email;
    try {
      const user: IUserEntity = UserEntity.buildUser(await this.userRepo.findByEmail(body));
      const accessToken = generateToken(user);
      requestMap.set(email, accessToken);

      const info: SentMessageInfo = await this.systemService.sendEmail({
        to: [email],
        subject: 'ERP Password Reset',
        emailBody: `This is the ERP Team07,\n\nPlease reset your password using the following link: ${url}/reset/${accessToken}\n\nRegards.`,
      });
      return info;
    } catch (err) {
      throw new NotFoundError(`User with email ${body.email} was not found`);
    }
  }

  public async resetPassword(token: string, pass: string): Promise<string> {
    let email;
    let found = false;

    for (const [_email, _token] of requestMap.entries()) {
      if (_token === token) {
        found = true;
        email = _email;
        break;
      }
    }

    try {
      if (found) {
        const salt = await bcrypt.genSalt(this.config.get<number>('salt'));
        const hash = await bcrypt.hash(pass, salt);
        const newPass = hash;

        await this.userRepo.updateByEmail(email, { password: newPass } as IUser);
        requestMap.delete(email);
        found = false;

        return email;
      } else throw new NotFoundError('Bad Token Request');
    } catch (err) {
      throw new NotFoundError('Bad Token Request');
    }
  }
}
