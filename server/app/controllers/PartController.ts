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

@controller('/part')
export class PartController extends BaseHttpController {
  constructor(@inject(TYPES.PartService) private partService: PartService) {
    super();
    console.log('test aaa');
  }

  @httpPost('/')
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      const part = await this.partService.createPart(req.body);
      return this.json(part);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  @httpGet('/')
  public async getList(): Promise<results.JsonResult> {
    try {
      const partList: IPart[] = await this.partService.getPartList();
      return this.json(partList);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }
}
