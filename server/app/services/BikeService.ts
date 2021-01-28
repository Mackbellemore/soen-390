import BikeModel, { IBike } from './../models/BikeModel';
import { BikeRespository } from './../repository/BikeRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';

@injectable()
export class BikeService {
  constructor(@inject(TYPES.BikeRespository) private bikeRepo: BikeRespository) {}

  public async getBikes(): Promise<IBike[]> {
    return await this.bikeRepo.get();
  }

  public async createBike(body: IBike): Promise<IBike> {
    const bike = new BikeModel(body);
    return await this.bikeRepo.create(bike);
  }
}
