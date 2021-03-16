import TYPES from '../constants/types';
import { IProduction } from './../models/ProductionModel';
import { inject, injectable } from 'inversify';
import { ProductionRepository } from './../repository/ProductionRepository';
import { NotFoundError } from '../errors';

@injectable()
export class ProductionService {
  constructor(
    @inject(TYPES.ProductionRepository) private productionRepository: ProductionRepository
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
    return this.productionRepository.create(body);
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
