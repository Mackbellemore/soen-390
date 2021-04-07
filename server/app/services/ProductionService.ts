import TYPES from '../constants/types';
import { IProduction } from './../models/ProductionModel';
import { inject, injectable } from 'inversify';
import { ProductionRepository } from './../repository/ProductionRepository';
import { BadRequestError, NotFoundError } from '../errors';
import { BikeService } from './BikeService';
import { PartService } from './PartService';
import PartEntity from './../entities/Part';
import BikeEntity from './../entities/Bike';
import { IBike } from './../models/BikeModel';
import { IPart } from './../models/PartModel';

@injectable()
export class ProductionService {
  constructor(
    @inject(TYPES.ProductionRepository) private productionRepository: ProductionRepository,
    @inject(TYPES.BikeService) private bikeService: BikeService,
    @inject(TYPES.PartService) private partService: PartService
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
      const validPart = await PartEntity.validate(
        ({
          ...body.componentDetail,
          stock: body.quantity,
          profitMargin: body.componentDetail.profitMargin,
        } as unknown) as IPart,
        'create'
      );
      const partCreated = await this.partService.createPart(validPart);
      body.componentId = partCreated._id;
      return this.productionRepository.create(body);
    }

    if (body.type === 'Bike') {
      const validBike = await BikeEntity.validate(
        ({ ...body.componentDetail, stock: body.quantity } as unknown) as IBike,
        'create'
      );
      const bikeCreated = await this.bikeService.createBike(validBike);
      body.componentId = bikeCreated._id;
      return this.productionRepository.create(body);
    }

    throw new BadRequestError('Invalid Production');
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
