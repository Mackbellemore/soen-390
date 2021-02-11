import { IPart } from '../models/PartModel';
import { PartRepository } from './../repository/PartRepository';
import TYPES from '../constants/types';
import { injectable, inject } from 'inversify';
import { NotFoundError } from '../errors';

@injectable()
export class PartService {
  constructor(@inject(TYPES.PartRepository) private partRepo: PartRepository) {}

  public async getPartList(): Promise<IPart[]> {
    return await this.partRepo.getList();
  }

  public async getName(name: string): Promise<IPart> {
    const material = await this.partRepo.getByName(name);
    if (!material) {
      throw new NotFoundError(`Part with name ${name} was not found`);
    }
    return material;
  }

  public async createPart(body: IPart): Promise<IPart> {
    return await this.partRepo.create(body);
  }

  public async updatePart(name: string, body: IPart): Promise<IPart | null> {
    const updatedPart = await this.partRepo.updateByName(name, body);
    if (!updatedPart) {
      throw new NotFoundError(`Part with name ${name} was not found`);
    }
    return updatedPart;
  }

  public async deletePart(name: string): Promise<IPart> {
    return await this.partRepo.delete(name);
  }
}
