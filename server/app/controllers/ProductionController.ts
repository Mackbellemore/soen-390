import { inject } from 'inversify';
import TYPES from '../constants/types';
import { ProductionService } from './../services/ProductionService';
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
import { Doc } from 'inversify-express-doc';

@controller('/productions')
export class ProductionController extends BaseController {
  constructor(@inject(TYPES.ProductionService) private productionService: ProductionService) {
    super();
  }

  @Doc('Get All Production')
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

  @Doc('Create Production')
  // @desc        Create new production
  // @route       POST /productions
  // @access      Public
  @httpPost('/', TYPES.LoggerMiddleware)
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const production = await this.productionService.createProduction(request.body);
      return this.json(production);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Delete Production by ID')
  // @desc        Delete production by ID
  // @route       DELETE /productions/:id
  // @access      Public
  @httpDelete('/:id', TYPES.LoggerMiddleware)
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const production = await this.productionService.deleteProduction(request.params.id);
      return this.json(production);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Doc('Update Production by ID')
  // @desc        update production by ID
  // @route       PATCH /productions/:id
  // @access      Public
  @httpPatch('/:id', TYPES.LoggerMiddleware)
  public async update(request: Request): Promise<results.JsonResult> {
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
