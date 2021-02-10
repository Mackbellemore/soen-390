import { IMaterial, MaterialSchema } from './../models/MaterialModel';
import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { BaseRepository } from './BaseRepository';

@injectable()
export class MaterialRepository extends BaseRepository<IMaterial> {
  protected readonly collectionName: string = 'materials';
  protected readonly schema: Schema = MaterialSchema;

  public async updateByName(name: string, body: IMaterial): Promise<IMaterial | null> {
    try {
      return await this.model.findOneAndUpdate({ name }, body, {
        returnOriginal: false,
        runValidators: true,
      });
    } catch (err) {
      return this.manageRepositoryError(err);
    }
  }

  public async getByName(name: string): Promise<IMaterial | null> {
    try {
      return await this.model.findOne({ name });
    } catch (err) {
      return this.manageRepositoryError(err);
    }
  }
}
