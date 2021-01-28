import { injectable } from 'inversify';
import { Error } from 'mongoose';
import BikeModel, { IBike } from '../models/BikeModel';

@injectable()
export class BikeRespository {
  public async get(): Promise<IBike[]> {
    return BikeModel.find()
      .then((data: IBike[]) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  public async create(bike: IBike): Promise<IBike> {
    return BikeModel.create(bike)
      .then((data: IBike) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
