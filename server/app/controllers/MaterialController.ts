import { IMaterial } from './../models/MaterialModel';
import { MaterialService } from './../services/MaterialService';
import { inject } from 'inversify';
import {
  controller,
  BaseHttpController,
  httpPost,
  results,
  httpGet,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { Request } from 'express';

@controller('/material')
export class MaterialController extends BaseHttpController {
  constructor(@inject(TYPES.MaterialService) private materialService: MaterialService) {
    super();
  }

  @httpPost('/')
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      const material = await this.materialService.createMaterial(req.body);
      return this.json(material);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  @httpGet('/')
  public async getList(): Promise<results.JsonResult> {
    try {
      const materialList: IMaterial[] = await this.materialService.getMaterialList();
      return this.json(materialList);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }
}
