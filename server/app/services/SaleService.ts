import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { NotFoundError, BadRequestError } from '../errors';
import { IBike } from '../models/BikeModel';
import { ISale } from './../models/SaleModel';
import { SaleRepository } from './../repository/SaleRepository';
import { BikeService } from './BikeService';

@injectable()
export class SaleService {
  constructor(
    @inject(TYPES.SaleRepository) private saleRepo: SaleRepository,
    @inject(TYPES.BikeService) private bikeService: BikeService
  ) {}

  public async getSales(): Promise<ISale[]> {
    return this.saleRepo.getList();
  }

  public async createSale(body: ISale): Promise<ISale> {
    if (!body.bikeId) throw new BadRequestError(`Missing Bike ID`);
    const bike: IBike = await this.bikeService.findById(body.bikeId);

    if (!bike) {
      throw new NotFoundError(`Bike with ID ${body.bikeId} is not found`);
    }

    if (Number.isNaN(bike.stock)) {
      throw new BadRequestError(`Bike with ID ${body.bikeId} doesn't have stock property`);
    }

    if (bike.stock < 1) {
      throw new BadRequestError(`Bike with ID ${body.bikeId} is out of stock`);
    }

    if (bike.stock < Number(body.quantity)) {
      throw new BadRequestError(
        `Unable to create sale, required ${body.quantity} but only found ${bike.stock} in stock`
      );
    }

    this.bikeService.updateBike(bike.id, { stock: bike.stock - Number(body.quantity) } as IBike);

    const sale = await this.saleRepo.create(body);
    return sale;
  }

  public async updateSale(body: ISale): Promise<ISale | null> {
    if (!body.bikeId) throw new BadRequestError(`Missing Bike ID`);

    const sale = await this.saleRepo.findById(body._id);

    if (!sale) throw new NotFoundError(`Cannot find sale with ID ${body._id}`);

    if (body.status === 'Cancelled' && sale.status !== 'Cancelled') {
      const bike: IBike = await this.bikeService.findById(sale.bikeId);

      if (!bike) {
        throw new NotFoundError(`Bike with ID ${sale.bikeId} is not found`);
      }

      if (Number.isNaN(bike.stock)) {
        throw new BadRequestError(`Bike with ID ${sale.bikeId} doesn't have stock property`);
      }

      this.bikeService.updateBike(bike.id, { stock: bike.stock + Number(sale.quantity) } as IBike);
    }

    const updatedSale = await this.saleRepo.update(body._id, { status: body.status } as ISale);
    return updatedSale;
  }
}
