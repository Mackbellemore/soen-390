import TYPES from '../constants/types';
import { IProduction } from './../models/ProductionModel';
import { inject, injectable } from 'inversify';
import { ProductionRepository } from './../repository/ProductionRepository';
import { BadRequestError, NotFoundError } from '../errors';
import PartEntity from './../entities/Part';
import BikeEntity from './../entities/Bike';
import { PartRepository } from './../repository/PartRepository';
import { BikeRepository } from './../repository/BikeRepository';

@injectable()
export class ProductionService {
  constructor(
    @inject(TYPES.ProductionRepository) private productionRepository: ProductionRepository,
    @inject(TYPES.PartRepository) private partRepository: PartRepository,
    @inject(TYPES.BikeRepository) private bikeRepository: BikeRepository
  ) {}

  /**
   * Return all productions json objects
   * @returns all productions
   */
  public async getProductions(): Promise<IProduction[]> {
    return this.productionRepository.getList();
  }

  /**
   * Create a new production json obj
   * @param body production json obj
   * @returns production json obj
   */
  public async createProduction(body: IProduction): Promise<IProduction> {
    if (body.type === 'Part') {
      const partEntity = {
        name: body.componentDetail.name,
        description: body.componentDetail.description,
        quality: body.componentDetail.quality,
        type: body.componentDetail.type,
        stock: body.quantity,
        // sellingPrice: ?,
        // costPrice: ?,
      };
      try {
        const validPart = await PartEntity.validate(partEntity, 'post');
        await this.partRepository.create(validPart);
        return this.productionRepository.create(body);
      } catch (error) {
        throw new BadRequestError('Invalid Part for Production');
      }
    }

    if (body.type === 'Bike') {
      const bikeEntity = {
        name: body.componentDetail.name,
        description: body.componentDetail.description,
        // weightAmount: ?,
        // weightType : ?,
        // sellingPrice: ?,
        // costPrice: ?,
        color: body.componentDetail.color,
        stock: body.quantity,
        // parts: ?
      };
      try {
        const validBike = await BikeEntity.validate(bikeEntity, 'post');
        await this.bikeRepository.create(validBike);
        return this.productionRepository.create(body);
      } catch (error) {
        throw new BadRequestError('Invalid Bike for Production');
      }
    }

    throw new BadRequestError('Invalid Production require type of Bike or Part');
  }

  /**
   * Delete a production json obj
   * @param body production json obj
   * @returns production json obj
   */
  public async deleteProduction(id: string): Promise<IProduction> {
    const deleteProduction = await this.productionRepository.delete(id);
    if (!deleteProduction) {
      throw new NotFoundError(`Production with id ${id} was not found!`);
    }
    return deleteProduction;
  }

  /**
   * Update a production json obj
   * @param id production id
   * @param body production change
   * @returns updated production obj
   */
  public async updateProduction(id: string, body: IProduction): Promise<IProduction> {
    const updateProduction = await this.productionRepository.update(id, body);
    if (!updateProduction) {
      throw new NotFoundError(`Production with id ${body.id} was not found!`);
    }
    return updateProduction;
  }
}
