import { IScheduling, SchedulingSchema } from '../models/SchedulingModel';
import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { BaseRepository } from './BaseRepository';

@injectable()
export class SchedulingRepository extends BaseRepository<IScheduling> {
  protected readonly collectionName: string = 'scheduling';
  protected readonly schema: Schema = SchedulingSchema;

  public async update(id: string, model: IScheduling): Promise<IScheduling | null> {
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
