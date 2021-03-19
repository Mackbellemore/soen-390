import TYPES from '../constants/types';
import { SaleService } from '../services/SaleService';
import { inject } from 'inversify';
import { controller, httpGet, results } from 'inversify-express-utils';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';
import { ISale } from '../models/SaleModel';

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
}
