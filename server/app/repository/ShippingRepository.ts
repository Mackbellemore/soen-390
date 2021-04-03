import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IShipping, ShippingSchema } from '../models/ShippingModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class ShippingRepository extends BaseRepository<IShipping> {
  protected readonly collectionName: string = 'shippings';
  protected readonly schema: Schema = ShippingSchema;

  public async update(id: string, newShpmtInfo: IShipping): Promise<IShipping | null> {
    try {
      return await this.model
        .findByIdAndUpdate(id, newShpmtInfo, { new: true, runValidators: true })
        .exec();
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }
}
