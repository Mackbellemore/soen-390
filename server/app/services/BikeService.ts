import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { IBike } from './../models/BikeModel';
import { BikeRepository } from './../repository/BikeRepository';
import { PartService } from './PartService';
import { BadRequestError, NotFoundError } from '../errors';
import { IPart } from '../models/PartModel';

@injectable()
export class BikeService {
  constructor(
    @inject(TYPES.BikeRepository) private bikeRepo: BikeRepository,
    @inject(TYPES.PartService) private partService: PartService
  ) {}

  public async getBikes(): Promise<IBike[]> {
    return this.bikeRepo.getList();
  }

  public async createBike(body: IBike): Promise<IBike> {
    // one day we can have some nice transactions, but not today
    await this.handlePartStock(body);
    return this.bikeRepo.create(body);
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
      throw new NotFoundError(`Bike with id ${id} was not found`);
    }

    return bike;
  }

  private async handlePartStock(body: IBike): Promise<void> {
    const callStack = [];
    let totalPrice = 0;
    const { stock: bikeStock } = body;
    for (const [partName, partId] of Object.entries(body.parts)) {
      // weird type converting here to escape the optional array return type
      const { stock: partStock, costPrice, name } = (await (this.partService.get(
        partId
      ) as unknown)) as IPart;

      totalPrice += costPrice;

      if (partStock <= bikeStock) {
        throw new BadRequestError(`${partName} ${name} does not have enough stock allocated`);
      }

      callStack.push(() =>
        this.partService.updatePart(name, { stock: partStock - bikeStock } as IPart)
      );
    }

    await Promise.all(callStack.map((update) => update()));
    body.costPrice = totalPrice;
    if (body.profitMargin > 0) {
      body.sellingPrice = totalPrice * body.profitMargin;
    }
  }
}
