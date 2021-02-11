import { IPart } from '../models/PartModel';
import { PartService } from '../services/PartService';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  results,
  httpGet,
  httpDelete,
  httpPatch,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { Request } from 'express';
import { BaseController } from './BaseController';

@controller('/parts')
export class PartController extends BaseController {
  constructor(@inject(TYPES.PartService) private partService: PartService) {
    super();
  }

  // @desc        Get all part
  // @route       GET /parts
  // @access      Public
  @httpGet('/')
  public async getList(): Promise<results.JsonResult> {
    try {
      const partList: IPart[] = await this.partService.getPartList();
      return this.json(partList);
    } catch (err) {
      return this.handleError(err);
    }
  }

  // @desc        Get by Name
  // @route       GET /parts/:name
  // @access      Public
  @httpGet('/:name')
  public async getName(req: Request): Promise<results.JsonResult> {
    try {
      const part = await this.partService.getName(req.params.name);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }

  // @desc        Create new part
  // @route       POST /parts
  // @access      Public
  @httpPost('/')
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      const part = await this.partService.createPart(req.body);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }

  // @desc        Update part
  // @route       PATCH /parts/:name
  // @access      Public
  @httpPatch('/:name')
  public async patch(req: Request): Promise<results.JsonResult> {
    try {
      const part = await this.partService.updatePart(req.params.name, req.body);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }

  // @desc        Delete part
  // @route       DELETE /parts/:name
  // @access      Public
  @httpDelete('/:name')
  public async delete(req: Request): Promise<results.JsonResult> {
    try {
      const part = await this.partService.deletePart(req.params.name);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
