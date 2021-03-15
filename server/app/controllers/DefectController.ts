import { IDefect } from './../models/DefectModel';
import { DefectService } from './../services/DefectService';
import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpDelete, results } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';

@controller('/defects')
export class DefectController extends BaseController {
  constructor(@inject(TYPES.DefectService) private defectService: DefectService) {
    super();
  }

  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const defects: IDefect[] = await this.defectService.getDefects();
      return this.json(defects);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const defect: IDefect = await this.defectService.createDefect(request.body);
      return this.json(defect);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpDelete('/')
  public async delete(req: Request): Promise<results.JsonResult> {
    try {
      const defect = await this.defectService.deleteDefects(req.body);
      return this.json(defect);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
