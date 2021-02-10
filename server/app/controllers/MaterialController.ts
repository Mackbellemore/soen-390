import { IMaterial } from './../models/MaterialModel';
import { MaterialService } from './../services/MaterialService';
import { inject } from 'inversify';
import { controller, httpPost, results, httpGet, httpPatch } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { Request } from 'express';
import { BaseController } from './BaseController';

@controller('/materials')
export class MaterialController extends BaseController {
  constructor(@inject(TYPES.MaterialService) private materialService: MaterialService) {
    super();
  }

  @httpPost('/')
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      const material = await this.materialService.createMaterial(req.body);
      return this.json(material);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpGet('/')
  public async getList(): Promise<results.JsonResult> {
    try {
      const materialList: IMaterial[] = await this.materialService.getMaterialList();
      return this.json(materialList);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPatch('/:name')
  public async updateByName(req: Request): Promise<results.JsonResult> {
    try {
      const updatedMaterial: IMaterial = await this.materialService.updateMaterial(
        req.params.name,
        req.body
      );
      return this.json(updatedMaterial);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpGet('/:name')
  public async getByName(req: Request): Promise<results.JsonResult> {
    try {
      const material: IMaterial = await this.materialService.findMaterial(req.params.name);
      return this.json(material);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
