import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IUser, UserSchema } from '../models/UserModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class UserRepository extends BaseRepository<IUser> {
  protected readonly collectionName: string = 'users';
  protected readonly schema: Schema = UserSchema;

  public async findByEmail(userBody: IUser): Promise<IUser> {
    const user: IUser | null = await this.model.findOne({ email: userBody.email }).exec();

    if (!user) {
      throw new Error(`User ${userBody.email} not found`);
    }

    return user;
  }

  public async updateByUsername(username: string, model: IUser): Promise<IUser | null> {
    try {
      return this.model.findOneAndUpdate({ username }, model, {
        returnOriginal: false,
        runValidators: true,
      });
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }

  public async updateByEmail(email: string, model: IUser): Promise<IUser | null> {
    try {
      return this.model.findOneAndUpdate({ email }, model, {
        returnOriginal: false,
        runValidators: true,
      });
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }

  public async deleteByEmail(userBody: IUser): Promise<IUser | null> {
    try {
      return this.model.findOneAndRemove({ email: userBody.email });
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }
}
