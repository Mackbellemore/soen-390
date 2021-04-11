import TYPES from '../constants/types';
import { IMachine } from '../models/MachineModel';
import { MachineRepository } from '../repository/MachineRepository';
import { inject, injectable } from 'inversify';
import { NotFoundError } from '../errors';

@injectable()
export class MachineService {
  constructor(@inject(TYPES.MachineRepository) private machineRepo: MachineRepository) {}

  public async getMachines(): Promise<IMachine[]> {
    return this.machineRepo.getList();
  }

  public async createMachine(body: IMachine): Promise<IMachine> {
    return this.machineRepo.create(body);
  }

  public async deleteMachine(body: string[]): Promise<(IMachine | null)[]> {
    return Promise.all(
      body.map(async (machineId) => {
        const deleteMachine = await this.machineRepo.delete(machineId);

        if (!deleteMachine) {
          throw new NotFoundError(`Machine with id ${deleteMachine} was not found`);
        }

        return deleteMachine;
      })
    );
  }

  public async getByMachineName(machineName: string): Promise<IMachine> {
    const machine = await this.machineRepo.getByMachineName(machineName);
    if (!machine) {
      throw new NotFoundError(`Machine with name ${machineName} was not found`);
    }
    return machine;
  }
}
