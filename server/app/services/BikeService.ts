import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { IBike } from './../models/BikeModel';
import { BikeRepository } from './../repository/BikeRepository';

@injectable()
export class BikeService {
  constructor(@inject(TYPES.BikeRepository) private bikeRepo: BikeRepository) {}

  public async getBikes(): Promise<IBike[]> {
    return await this.bikeRepo.getList();
  }

  public async createBike(body: IBike): Promise<IBike> {
    return await this.bikeRepo.create(body);
  }
}
