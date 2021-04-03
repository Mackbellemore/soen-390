import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IDefect, DefectSchema } from '../models/DefectModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class DefectRepository extends BaseRepository<IDefect> {
  protected readonly collectionName: string = 'defects';
  protected readonly schema: Schema = DefectSchema;

  public async update(id: string, model: IDefect): Promise<IDefect | null> {
    try {
      return await this.model
        .findByIdAndUpdate(id, model, {
          returnOriginal: false,
          runValidators: true,
        })
        .exec();
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }
}
