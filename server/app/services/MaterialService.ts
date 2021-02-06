import { IMaterial } from './../models/MaterialModel';
import { MaterialRepository } from './../repository/MaterialRepository';
import TYPES from '../constants/types';
import { injectable, inject } from 'inversify';

@injectable()
export class MaterialService {
  constructor(@inject(TYPES.MaterialRepository) private materialRepo: MaterialRepository) {}

  public async createMaterial(body: IMaterial): Promise<IMaterial> {
    return await this.materialRepo.create(body);
  }

  public async getMaterialList(): Promise<IMaterial[]> {
    return await this.materialRepo.getList();
  }
}
