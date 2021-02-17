import { IUserEntity, UserEntity } from './../entities/User';
import { IUser } from './../models/UserModel';
import { UserRepository } from './../repository/UserRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import bcrypt from 'bcryptjs';
import { IConfig } from 'config';
import validator from 'validator';
import { BadRequestError } from '../errors';

@injectable()
export class UserService {
  @inject(TYPES.config) private config: IConfig;
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
}
