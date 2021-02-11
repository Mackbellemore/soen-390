import { IBike } from './../models/BikeModel';
import { BikeRepository } from './../repository/BikeRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { NotFoundError } from '../errors';

@injectable()
export class BikeService {
  constructor(@inject(TYPES.BikeRepository) private bikeRepo: BikeRepository) {}

  public async getBikes(): Promise<IBike[]> {
    return await this.bikeRepo.getList();
  }

  public async createBike(body: IBike): Promise<IBike> {
    return await this.bikeRepo.create(body);
  }

  public async updateBike(id: string, body: IBike): Promise<IBike> {
    const updatedBike = await this.bikeRepo.update(id, body);
    if (!updatedBike) {
      throw new NotFoundError(`Bike with id ${id} was not found`);
    }

    return updatedBike;
  }

  public async deleteBike(body: IBike): Promise<IBike | null> {
    const deletedBike = await this.bikeRepo.delete(body.id);
    if (!deletedBike) {
      throw new NotFoundError(`Bike with id ${body.id} was not found`);
    }

    return deletedBike;
  }

  public async findById(id: string): Promise<IBike> {
    const bike = await this.bikeRepo.findById(id);
    if (!bike) {
      throw new NotFoundError(`Material with name ${name} was not found`);
    }

    return bike;
  }
}
