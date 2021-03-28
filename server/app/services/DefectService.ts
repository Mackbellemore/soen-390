import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { IDefect, IBikeDefect } from './../models/DefectModel';
import { IPart } from '../models/PartModel';
import { DefectRepository } from './../repository/DefectRepository';
import { PartService } from './PartService';
import { BikeService } from './BikeService';
import { NotFoundError, ConflictError, BadRequestError } from '../errors';

@injectable()
export class DefectService {
  ticketIdCount: number;
  constructor(
    @inject(TYPES.DefectRepository) private defectRepo: DefectRepository,
    @inject(TYPES.PartService) private partService: PartService,
    @inject(TYPES.BikeService) private bikeService: BikeService
  ) {
    this.ticketIdCount = 0;
  }

  public async getDefects(): Promise<IDefect[]> {
    return this.defectRepo.getList();
  }

  public async getBikeDefects(): Promise<IBikeDefect[]> {
    const bikes = await this.bikeService.getBikes();
    const bikeDefects: IBikeDefect[] = [];
    await Promise.all(
      bikes.map(async (bike) => {
        const defects = [];
        if (bike.parts) {
          for (const partId of Object.values(bike.parts)) {
            const part = (await this.partService.get(partId)) as IPart;

            if (part.defectId) defects.push(await this.defectRepo.findById(part.defectId));
          }
          if (defects.length !== 0)
            bikeDefects.push({ bike: bike.name, defects: defects as IDefect[] });
        }
      })
    );
    return bikeDefects;
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

  public async updateDefect(body: IDefect): Promise<IDefect | null> {
    if (!body._id) throw new BadRequestError(`Missing Defect ID`);

    const defect = await this.defectRepo.findById(body._id);

    if (!defect) throw new NotFoundError(`Cannot find defect with ID ${body._id}`);

    const updatedDefect = await this.defectRepo.update(body._id, {
      status: body.status ? body.status : defect.status,
      description: body.description ? body.description : defect.description,
    } as IDefect);
    return updatedDefect;
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
        return this.defectRepo.delete(defectId);
      })
    );
  }

  public async updatePart(partName: string, object: unknown): Promise<void> {
    await this.partService.updatePart(partName, (object as unknown) as IPart);
  }
}
