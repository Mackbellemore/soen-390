import { IBike } from './../models/BikeModel';
import { BikeRepository } from './../repository/BikeRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';

@injectable()
export class BikeService {
  constructor(@inject(TYPES.BikeRepository) private bikeRepo: BikeRepository) {}

  public async getBikes(): Promise<IBike[]> {
    return this.bikeRepo.getList();
  }

  public async createBike(body: IBike): Promise<IBike> {
    return this.bikeRepo.create(body);
  }
}
