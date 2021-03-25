import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { BaseRepository } from './BaseRepository';
import { IMachine, MachineSchema } from '../models/MachineModel';

@injectable()
export class MachineRepository extends BaseRepository<IMachine> {
  protected readonly collectionName: string = 'machine';
  protected readonly schema: Schema = MachineSchema;

  public async getByMachineName(machineName: string): Promise<IMachine | null> {
    try {
      return await this.model.findOne({ machineName });
    } catch (err) {
      console.log(err);
      return this.manageRepositoryError(err);
    }
  }
}
