import { MaterialService } from './MaterialService';
import { IPart } from '../models/PartModel';
import { PartRepository } from './../repository/PartRepository';
import TYPES from '../constants/types';
import { injectable, inject } from 'inversify';
import { BadRequestError, NotFoundError } from '../errors';
import { IMaterial } from '../models/MaterialModel';
import { partTypeMaterials } from '../validation/parts/partTypes';
import { partType } from './../entities/Part';
import { DefectRepository } from './../repository/DefectRepository';

@injectable()
export class PartService {
  constructor(
    @inject(TYPES.MaterialService) private materialService: MaterialService,
    @inject(TYPES.DefectRepository) private defectRepo: DefectRepository,
    @inject(TYPES.PartRepository) private partRepo: PartRepository
  ) {}

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
    const price = await this.handleMaterialStockUpdates(body.stock, body.type);
    body.costPrice = price;
    if (body.profitMargin > 0) {
      body.sellingPrice = price * body.profitMargin;
    }
    const part = await this.partRepo.create(body);

    return part;
  }

  public async updatePart(name: string, body: IPart): Promise<IPart | null> {
    const originalPart = (await (this.get(undefined, name) as unknown)) as IPart;

    // if were increasing the stock, then make sure we have the materials for it
    if (body.stock > originalPart.stock) {
      const price = await this.handleMaterialStockUpdates(
        body.stock - originalPart.stock,
        originalPart.type
      );
      body.costPrice = price;
    }

    return this.partRepo.updateByName(name, body);
  }

  public async deletePart(name: string): Promise<IPart | null> {
    const part = (await this.get(undefined, name)) as IPart;
    if (part) {
      const defectId = part.defectId;
      await this.defectRepo.delete(defectId);
    }
    return this.partRepo.deletePart(name);
  }

  // function to validate and update material stocks when creating a new part
  public async handleMaterialStockUpdates(partStock: number, partType: partType): Promise<number> {
    // list of material and stock needed defined under app/validation/parts/partTypes.ts
    const materialList = partTypeMaterials[partType];
    let totalPrice = 0;

    // loop over all the materials to check stock availability and update stocks accordingly
    const callStack = [];
    for (const [materialName, materialStock] of Object.entries(materialList)) {
      // multiply the material stock by the amount of parts we want to add
      const neededStock = Number(materialStock) * partStock;

      const { stock, price } = await this.materialService.findMaterial(materialName);
      totalPrice += price;

      // check if we have the amount of stock needed for each required material to create the part
      if (stock < Number(neededStock)) {
        throw new BadRequestError(
          `Unable to create this part, required ${neededStock} ${materialName} but only found ${stock} in stock`
        );
      }

      // if we have the stock needed then store the call to decrement the material stock
      callStack.push(() =>
        this.materialService.updateMaterial(materialName, {
          stock: stock - Number(neededStock),
        } as IMaterial)
      );
    }

    // Call all the updates stored in the callStack
    await Promise.all(callStack.map((update) => update()));
    return totalPrice;
  }
}
