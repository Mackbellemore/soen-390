import TYPES from '../constants/types';
import { IScheduling } from '../models/SchedulingModel';
import { SchedulingRepository } from '../repository/SchedulingRepository';
import { inject, injectable } from 'inversify';
import { NotFoundError } from '../errors';
import { MachineService } from './MachineService';
import { IMachine } from '../models/MachineModel';

@injectable()
export class SchedulingService {
  constructor(
    @inject(TYPES.SchedulingRepository) private schedulingRepo: SchedulingRepository,
    @inject(TYPES.MachineService) private machineService: MachineService
  ) {}

  public async getSchedulings(): Promise<IScheduling[]> {
    return this.schedulingRepo.getList();
  }

  public async createScheduling(body: IScheduling): Promise<IScheduling> {
    const machine = (await this.machineService.getByMachineName(body.machineName)) as IMachine;
    if (!machine) {
      throw new NotFoundError(`${body.machineName} is not found`);
    }
    return this.schedulingRepo.create(body);
  }

  public async updateScheduling(id: string, body: IScheduling): Promise<IScheduling> {
    const machine = (await this.machineService.getByMachineName(body.machineName)) as IMachine;

    if (!machine) {
      throw new NotFoundError(`${body.machineName} is not found`);
    }

    const updateScheduling = await this.schedulingRepo.update(id, body);
    if (!updateScheduling) {
      throw new NotFoundError(`Scheduling with id ${id} was not found`);
    }

    return updateScheduling;
  }

  public async deleteScheduling(body: string[]): Promise<(IScheduling | null)[]> {
    return Promise.all(
      body.map(async (schedulingId) => {
        const deletedScheduling = await this.schedulingRepo.delete(schedulingId);

        if (!deletedScheduling) {
          throw new NotFoundError(`Scheduling with id ${deletedScheduling} was not found`);
        }

        return deletedScheduling;
      })
    );
  }

  public async findById(id: string): Promise<IScheduling> {
    const scheduling = await this.schedulingRepo.findById(id);
    if (!scheduling) {
      throw new NotFoundError(`Scheduling with id ${id} was not found`);
    }

    return scheduling;
  }
}
