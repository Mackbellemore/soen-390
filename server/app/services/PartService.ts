import { IPart } from '../models/PartModel';
import { PartRepository } from './../repository/PartRepository';
import TYPES from '../constants/types';
import { injectable, inject } from 'inversify';
import { NotFoundError } from '../errors';

@injectable()
export class PartService {
  constructor(@inject(TYPES.PartRepository) private partRepo: PartRepository) {}

  public async get(id?: string, name?: string): Promise<IPart[] | IPart> {
    if (!id && !name) {
      return this.partRepo.getList();
    }

    let part;

    if (id) {
      part = await this.partRepo.findById(id);
      if (!part) {
        throw new NotFoundError(`Part with id ${id} was not found`);
      }
      return part;
    }

    if (name) {
      part = await this.partRepo.getByName(name);
      if (!part) {
        throw new NotFoundError(`Part with name ${name} was not found`);
      }
      return part;
    }

    throw new NotFoundError('No part was found');
  }

  public async createPart(body: IPart): Promise<IPart> {
    return this.partRepo.create(body);
  }

  public async updatePart(name: string, body: IPart): Promise<IPart | null> {
    const updatedPart = await this.partRepo.updateByName(name, body);
    if (!updatedPart) {
      throw new NotFoundError(`Part with name ${name} was not found`);
    }
    return updatedPart;
  }

  public async deletePart(name: string): Promise<IPart | null> {
    return this.partRepo.deletePart(name);
  }
}
