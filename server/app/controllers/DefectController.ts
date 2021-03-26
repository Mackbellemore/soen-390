import { IDefect } from './../models/DefectModel';
import { DefectService } from './../services/DefectService';
import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  httpDelete,
  httpPatch,
  results,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';

@controller('/defects')
export class DefectController extends BaseController {
  constructor(@inject(TYPES.DefectService) private defectService: DefectService) {
    super();
  }

  @Doc('Get All Defect')
  /**
   * @desc        Get all defect
   * @route       GET /defects
   * @access      Public
   * @returns     List Defects Json Format
   */
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const defects: IDefect[] = await this.defectService.getDefects();
      return this.json(defects);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Create new Defect')
  /**
   * @desc          Create new Defect
   * @route         POST /defects
   * @access        Public
   * @param request
   * @returns       Defect Json Format
   */
  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const defect: IDefect = await this.defectService.createDefect(request.body);
      return this.json(defect);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Delete a Defect')
  /**
   * @desc          Delete Defect
   * @route         DELETE /defects
   * @access        Public
   * @param req
   * @returns       Defect Json Format
   */
  @httpDelete('/')
  public async delete(req: Request): Promise<results.JsonResult> {
    try {
      const defect = await this.defectService.deleteDefects(req.body);
      return this.json(defect);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Update Defect by ID')
  /**
   * @desc          Update Defect by ID
   * @route         PATCH /defects
   * @access        Public
   * @param request
   * @returns       Defect Json Format
   */
  @httpPatch('/')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const defect: IDefect | null = await this.defectService.updateDefect(request.body);
      return this.json(defect);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
