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
import PartEntity from './../entities/Part';
import { partTypeMaterials } from '../validation/parts/partTypes';
import { Doc } from 'inversify-express-doc';

@controller('/parts')
export class PartController extends BaseController {
  constructor(@inject(TYPES.PartService) private partService: PartService) {
    super();
  }

  @Doc('Get One Part or All Parts')
  /*
   * @desc        Get one part or all parts
   * @route       GET /parts or /parts?name= or parts?id=
   * @access      Public
   * @param  {string} id part id
   * @param  {string} name part name
   */
  @httpGet('/')
  public async get(
    @queryParam('id') id?: string,
    @queryParam('name') name?: string
  ): Promise<results.JsonResult> {
    try {
      const part: IPart[] | IPart = await this.partService.get(id, name);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Create new Part')
  /**
   * @desc        Create new part
   * @route       POST /parts
   * @access      Public
   * @param req
   * @returns     Part Json Format
   */
  @httpPost('/')
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      const validPartBody = await PartEntity.validate(req.body, 'post');
      const part = await this.partService.createPart(validPartBody);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Update Part by Name')
  /**
   * @desc        Update part by name
   * @route       PATCH /parts/:name
   * @access      Public
   * @param req   Parameter name
   * @returns     Part Json Format
   */
  @httpPatch('/:name')
  public async patch(req: Request): Promise<results.JsonResult> {
    try {
      const validPartBody = await PartEntity.validate(req.body, 'patch');
      const part = await this.partService.updatePart(req.params.name, validPartBody);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Delete Part By Name')
  /**
   * @desc        Delete part
   * @route       DELETE /parts/:name
   * @access      Public
   * @param req   Parameter name
   * @returns     Part Json Format
   */
  @httpDelete('/:name')
  public async delete(req: Request): Promise<results.JsonResult> {
    try {
      const part = await this.partService.deletePart(req.params.name);
      return this.json(part);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Get All Parts')
  /*
   * @desc        Gets the material list rules to create a type of part
   * @route       GET /parts/materialList
   * @access      Public
   */
  @httpGet('/materialList')
  public async getMaterialList(): Promise<results.JsonResult> {
    return this.json(partTypeMaterials);
  }
}
