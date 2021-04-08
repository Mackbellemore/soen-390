import { injectable } from 'inversify';
import { BaseRepository } from './BaseRepository';
import { IProduction, ProductionSchema } from './../models/ProductionModel';
import { Schema } from 'mongoose';

@injectable()
export class ProductionRepository extends BaseRepository<IProduction> {
  protected readonly collectionName: string = 'productions';
  protected readonly schema: Schema = ProductionSchema;

  public async update(id: string, model: IProduction): Promise<IProduction | null> {
    try {
      return await this.model
        .findByIdAndUpdate(id, model, {
          returnOriginal: false,
          runValidators: true,
        })
        .exec();
    } catch (error) {
      this.manageRepositoryError(error);
    }
  }
}
