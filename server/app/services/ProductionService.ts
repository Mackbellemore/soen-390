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
  public async createProduction(body: any): Promise<IProduction> {
    if (body.type === 'Part') {
      const partEntity = {
        name: body.componentDetail.name,
        quality: body.componentDetail.quality,
        description: body.componentDetail.description,
        type: body.componentDetail.type,
        color: body.componentDetail.color,
        finish: body.componentDetail.finish,
        grade: body.componentDetail.grade,
        detail: body.componentDetail.detail,
        stock: body.quantity,
        profitMargin: body.componentDetail.profitMargin,
      } as IPart;
      const validPart = await PartEntity.validate(partEntity, 'create');
      const partCreated = await this.partService.createPart(validPart);
      body.componentId = partCreated._id;
      return this.productionRepository.create(body);
    }

    if (body.type === 'Bike') {
      const bikeEntity = {
        name: body.componentDetail.name,
        description: body.componentDetail.description,
        weightAmount: body.componentDetail.weightAmount,
        weightType: body.componentDetail.weightType,
        color: body.componentDetail.color,
        parts: body.componentDetail.parts,
        stock: body.quantity,
        profitMargin: body.componentDetail.profitMargin,
      } as IBike;
      const validBike = await BikeEntity.validate(bikeEntity, 'create');
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
