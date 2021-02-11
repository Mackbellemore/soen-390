import { IPart } from '../models/PartModel';
import { PartService } from '../services/PartService';
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

@controller('/parts')
export class PartController extends BaseHttpController {
  constructor(@inject(TYPES.PartService) private partService: PartService) {
    super();
  }

  // @desc        Get all part
  // @route       GET /parts/
  // @access      Public
  @httpGet('/')
  public async getList(): Promise<results.JsonResult> {
    try {
      const partList: IPart[] = await this.partService.getPartList();
      return this.json(partList);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  // @desc        Get by ID
  // @route       GET /parts/:id
  // @access      Public
  // @httpGet('/:id')
  // public async getId(): Promise<results.JsonResult> {
  //   try {
  //     const part = await this.partService.get();
  //     return this.json(part);
  //   } catch (err) {
  //     return this.json(err.message, 400);
  //   }
  // }

  // @desc        Get by Name
  // @route       GET /parts/:name
  // @access      Public
  // @httpGet('/:name')
  // public async getName(): Promise<results.JsonResult> {
  //   try {
  //     const part = await this.partService.get();
  //     return this.json(part);
  //   } catch (err) {
  //     return this.json(err.message, 400);
  //   }
  // }

  // @desc        Create new part
  // @route       POST /parts
  // @access      Public
  @httpPost('/')
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      const part = await this.partService.createPart(req.body);
      return this.json(part);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }
}
