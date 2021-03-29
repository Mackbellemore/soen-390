import { IMaterial } from './../models/MaterialModel';
import { MaterialService } from './../services/MaterialService';
import { inject } from 'inversify';
import { controller, httpPost, results, httpGet, httpPatch } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { Request } from 'express';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';

@controller('/materials')
export class MaterialController extends BaseController {
  constructor(@inject(TYPES.MaterialService) private materialService: MaterialService) {
    super();
  }

  @Doc('Create new Material')
  /**
   * @desc        Create new material
   * @route       POST /materials
   * @access      Public
   * @param req
   * @returns     Material Json Format
   */
  @httpPost('/', TYPES.LoggerMiddleware)
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      const material = await this.materialService.createMaterial(req.body);
      return this.json(material);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Get All Materials')
  /**
   * @desc        Get all materials
   * @route       GET /materials
   * @access      Public
   * @param req
   * @returns     List Materials Json Format
   */
  @httpGet('/')
  public async getList(): Promise<results.JsonResult> {
    try {
      const materialList: IMaterial[] = await this.materialService.getMaterialList();
      return this.json(materialList);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Update Material by Name')
  /**
   * @desc        Update material by name
   * @route       PATCH /material
   * @access      Public
   * @param req
   * @returns     Material Json Format
   */
  @httpPatch('/:name', TYPES.LoggerMiddleware)
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

  @Doc('Get a Material by Name')
  /**
   * @desc        Get a material by name
   * @route       GET /material
   * @access      Public
   * @param req
   * @returns     Material Json Format
   */
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
