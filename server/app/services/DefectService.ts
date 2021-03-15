import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { IDefect } from './../models/DefectModel';
import { IPart } from '../models/PartModel';
import { DefectRepository } from './../repository/DefectRepository';
import { PartService } from './PartService';
import { NotFoundError, ConflictError } from '../errors';

@injectable()
export class DefectService {
  ticketIdCount: number;
  constructor(
    @inject(TYPES.DefectRepository) private defectRepo: DefectRepository,
    @inject(TYPES.PartService) private partService: PartService
  ) {
    this.ticketIdCount = 0;
  }

  public async getDefects(): Promise<IDefect[]> {
    return this.defectRepo.getList();
  }

  public async createDefect(body: IDefect): Promise<IDefect> {
    if (!body.partName) throw new NotFoundError(body.partName + 'testing');
    const part = (await this.partService.get(undefined, body.partName)) as IPart;

    if (!part) {
      throw new NotFoundError(`${body.partName} is not found`);
    }
    if (part.defectId) {
      throw new ConflictError(`Part with name ${body.partName} already has a defect`);
    }

    this.ticketIdCount++;
    body.id = this.ticketIdCount;
    const defect = await this.defectRepo.create(body);
    await this.updatePart(part.name, {
      defectId: defect._id,
    });
    return defect;
  }

  public async deleteDefects(body: string[]): Promise<(IDefect | null)[]> {
    return Promise.all(
      body.map(async (defectId) => {
        const defect = (await this.defectRepo.findById(defectId)) as IDefect;
        if (!defect) {
          throw new NotFoundError(`${defectId} is not found`);
        }
        const part = (await this.partService.get('', defect.partName)) as IPart;

        await this.updatePart(part.name, { defectId: null });
        return await this.defectRepo.delete(defectId);
      })
    );
  }

  public async updatePart(partName: string, object: unknown): Promise<void> {
    await this.partService.updatePart(partName, (object as unknown) as IPart);
  }
}
