import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { ISale, SaleSchema } from '../models/SaleModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class SaleRepository extends BaseRepository<ISale> {
  protected readonly collectionName: string = 'sales';
  protected readonly schema: Schema = SaleSchema;

  public async update(id: string, model: ISale): Promise<ISale | null> {
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
