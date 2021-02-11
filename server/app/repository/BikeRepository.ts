import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IBike, BikeSchema } from '../models/BikeModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class BikeRepository extends BaseRepository<IBike> {
  protected readonly collectionName: string = 'bikes';
  protected readonly schema: Schema = BikeSchema;

  // public async updateByName(name: string, body: IMaterial): Promise<IMaterial | null> {
  //   try {
  //     return await this.model.findOneAndUpdate({ name }, body, {
  //       returnOriginal: false,
  //       runValidators: true,
  //     });
  //   } catch (err) {
  //     return this.manageRepositoryError(err);
  //   }
  // }
    
  // public async deleteSerialNumber(serialNumber: string, body: IMaterial): Promise<IMaterial | null> {
  //   try {
  //       await this.model.findOneAndRemove( { serialNumber }, body, {
  //         returnOriginal: false,
  //         runValidators: true,
  //       });
  //   } catch (err) {
  //     return this.manageRepositoryError(err);
  //   }
  // }

}
