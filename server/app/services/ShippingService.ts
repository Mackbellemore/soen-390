import { IShipping } from './../models/ShippingModel';
import { ShippingRepository } from './../repository/ShippingRepository';
import TYPES from '../constants/types';
import { injectable, inject } from 'inversify';
import { NotFoundError } from '../errors';

@injectable()
export class ShippingService {
  constructor(@inject(TYPES.ShippingRepository) private shippingRepo: ShippingRepository) {}

  public async createShipment(body: IShipping): Promise<IShipping> {
    try {
      return await this.shippingRepo.create(body);
    } catch (err) {
      throw new NotFoundError(`Shipment was not created successfully`);
    }
  }

  public async deleteShipment(ids: string[]): Promise<(IShipping | null)[]> {
    return Promise.all(
      ids.map(async (id) => {
        const shipment = await this.shippingRepo.delete(id);
        if (!shipment) {
          throw new NotFoundError(`Shipment ${id} was not deleted successfully`);
        }
        return shipment;
      })
    );
  }

  public async getShippingList(): Promise<IShipping[]> {
    try {
      return await this.shippingRepo.getList();
    } catch (err) {
      throw new NotFoundError(`Cannot get shippings successfully`);
    }
  }

  public async updateShipment(body: IShipping): Promise<IShipping | null> {
    const shipment = await this.shippingRepo.update(body._id, body);
    if (!shipment) {
      throw new NotFoundError(`Shipment ${body._id} was not updated successfully`);
    }
    return shipment;
  }
}
