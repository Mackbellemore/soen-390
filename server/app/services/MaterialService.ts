import { IMaterial } from './../models/MaterialModel';
import { MaterialRepository } from './../repository/MaterialRepository';
import TYPES from '../constants/types';
import { injectable, inject } from 'inversify';
import { NotFoundError } from '../errors';

@injectable()
export class MaterialService {
  constructor(@inject(TYPES.MaterialRepository) private materialRepo: MaterialRepository) {}

  public async createMaterial(body: IMaterial): Promise<IMaterial> {
    return this.materialRepo.create(body);
  }

  public async getMaterialList(): Promise<IMaterial[]> {
    return this.materialRepo.getList();
  }

  public async updateMaterial(name: string, body: IMaterial): Promise<IMaterial> {
    const updatedMaterial = await this.materialRepo.updateByName(name, body);
    if (!updatedMaterial) {
      throw new NotFoundError(`Material with name ${name} was not found`);
    }

    return updatedMaterial;
  }

  public async findMaterial(name: string): Promise<IMaterial> {
    const material = await this.materialRepo.getByName(name);
    if (!material) {
      throw new NotFoundError(`Material with name ${name} was not found`);
    }

    return material;
  }
}
