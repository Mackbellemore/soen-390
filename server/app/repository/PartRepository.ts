import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IPart, PartSchema } from './../models/PartModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class PartRepository extends BaseRepository<IPart> {
  protected readonly collectionName: string = 'parts';
  protected readonly schema: Schema = PartSchema;

  public async getByName(name: string): Promise<IPart | null> {
    try {
      return await this.model.findOne({ name });
    } catch (err) {
      return this.manageRepositoryError(err);
    }
  }

  public async updateByName(name: string, body: IPart): Promise<IPart | null> {
    try {
      return await this.model.findOneAndUpdate({ name }, body, {
        returnOriginal: false,
        runValidators: true,
      });
    } catch (err) {
      return this.manageRepositoryError(err);
    }
  }

  public async deletePart(name: string): Promise<IPart> {
    try {
      return await this.model.deleteOne({ name });
    } catch (err) {
      return this.manageRepositoryError(err);
    }
  }
}
