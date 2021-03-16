import { inject } from 'inversify';
import TYPES from '../constants/types';
import { ProductionService } from '../services/ProductionService';
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  results,
} from 'inversify-express-utils';
import { BaseController } from './BaseController';
import { IProduction } from './../models/ProductionModel';
import { Request } from 'express';

@controller('/productions')
export class ProductionController extends BaseController {
  constructor(@inject(TYPES.ProductionService) private productionService: ProductionService) {
    super();
  }

  // @desc        Get all production
  // @route       GET /productions
  // @access      Public
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const production: IProduction[] = await this.productionService.getProductions();
      return this.json(production);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // @desc        Create new production
  // @route       POST /productions
  // @access      Public
  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const production = await this.productionService.createProduction(request.body);
      return this.json(production);
    } catch (err) {
      return this.handleError(err);
    }
  }

  // @desc        Delete part
  // @route       DELETE /productions
  // @access      Public
  @httpDelete('/:id')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const production = await this.productionService.deleteProduction(request.params.id);
      return this.json(production);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @httpPatch('/:id')
  public async update(request: Request): Promise<results.JsonResult> {
    console.log('yes?');
    try {
      const production = await this.productionService.updateProduction(
        request.params.id,
        request.body
      );
      return this.json(production);
    } catch (error) {
      return this.handleError(error);
    }
  }
}
