import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IOrder, OrderSchema } from '../models/OrderModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class OrderRepository extends BaseRepository<IOrder> {
  protected readonly collectionName: string = 'orders';
  protected readonly schema: Schema = OrderSchema;

  public async update(id: string, model: IOrder): Promise<IOrder | null> {
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
