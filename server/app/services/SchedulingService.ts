import TYPES from '../constants/types';
import { IScheduling } from '../models/SchedulingModel';
import { SchedulingRepository } from '../repository/SchedulingRepository';
import { inject, injectable } from 'inversify';
import { NotFoundError } from '../errors';

@injectable()
export class SchedulingService {
  constructor(@inject(TYPES.SchedulingRepository) private schedulingRepo: SchedulingRepository) {}

  public async getSchedulings(): Promise<IScheduling[]> {
    return this.schedulingRepo.getList();
  }

  public async createScheduling(body: IScheduling): Promise<IScheduling> {
    return this.schedulingRepo.create(body);
  }

  public async updateScheduling(id: string, body: IScheduling): Promise<IScheduling> {
    const updateScheduling = await this.schedulingRepo.update(id, body);
    if (!updateScheduling) {
      throw new NotFoundError(`Scheduling with id ${id} was not found`);
    }

    return updateScheduling;
  }

  public async deleteScheduling(body: IScheduling): Promise<IScheduling | null> {
    const deletedScheduling = await this.schedulingRepo.delete(body.id);
    if (!deletedScheduling) {
      throw new NotFoundError(`Scheduling with id ${body.id} was not found`);
    }

    return deletedScheduling;
  }

  public async findById(id: string): Promise<IScheduling> {
    const scheduling = await this.schedulingRepo.findById(id);
    if (!scheduling) {
      throw new NotFoundError(`Scheduling with id ${id} was not found`);
    }

    return scheduling;
  }
}
