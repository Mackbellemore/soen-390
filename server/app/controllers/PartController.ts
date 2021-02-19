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
  queryParam,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { Request } from 'express';
import { BaseController } from './BaseController';

@controller('/parts')
export class PartController extends BaseController {
  constructor(@inject(TYPES.PartService) private partService: PartService) {
    super();
  }

  /*
  @desc        Get one part or all parts
  @route       GET /parts or /parts?name= or parts?id=
  @access      Public
  @param  {string} id part id
  @param  {string} name part name
  */
  @httpGet('/')
  public async get(
    @queryParam('id') id: string,
    @queryParam('name') name: string
  ): Promise<results.JsonResult> {
    try {
      const part: IPart[] | IPart = await this.partService.get(id, name);
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

  // @desc        Update part by name
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
