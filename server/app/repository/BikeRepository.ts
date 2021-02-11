import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IBike, BikeSchema } from '../models/BikeModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class BikeRepository extends BaseRepository<IBike> {
  protected readonly collectionName: string = 'bikes';
  protected readonly schema: Schema = BikeSchema;

  public async update(id: string, model: IBike) : Promise<IBike | null> {    
    try {
      return await this.model.findByIdAndUpdate( id, model, {
        returnOriginal: false,
        runValidators: true,
      });
      
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }

}
