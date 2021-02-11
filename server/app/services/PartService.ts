import { IPart } from '../models/PartModel';
import { PartRepository } from './../repository/PartRepository';
import TYPES from '../constants/types';
import { injectable, inject } from 'inversify';

@injectable()
export class PartService {
  constructor(@inject(TYPES.PartRepository) private partRepo: PartRepository) {}

  public async getPartList(): Promise<IPart[]> {
    return await this.partRepo.getList();
  }

  public async createPart(body: IPart): Promise<IPart> {
    return await this.partRepo.create(body);
  }
}
