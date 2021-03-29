import TYPES from '../constants/types';
import { SaleService } from '../services/SaleService';
import { inject } from 'inversify';
import { controller, httpGet, httpPatch, httpPost, results } from 'inversify-express-utils';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';
import { ISale } from '../models/SaleModel';
import { Request } from 'express';

@controller('/sales')
export class SaleController extends BaseController {
  constructor(@inject(TYPES.SaleService) private saleService: SaleService) {
    super();
  }

  @Doc('Get All Sales')
  /*
   * @desc        Get all sales
   * @route       GET /sales
   * @access      Public
   * @returns     List sales Json Format
   */
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const sales: ISale[] = await this.saleService.getSales();
      return this.json(sales);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Create new Sale')
  /**
   * @desc          Create new Sale
   * @route         POST /sales
   * @access        Public
   * @param request
   * @returns       Sale Json Format
   */
  @httpPost('/', TYPES.LoggerMiddleware)
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const sale: ISale = await this.saleService.createSale(request.body);
      return this.json(sale);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Update Sale by ID')
  /**
   * @desc          Update Sale by ID
   * @route         PATCH /sales
   * @access        Public
   * @param request
   * @returns       Sale Json Format
   */
  @httpPatch('/')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const sale: ISale | null = await this.saleService.updateSale(request.body);
      return this.json(sale);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
