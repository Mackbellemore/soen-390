import TYPES from '../constants/types';
import { ShippingService } from '../services/ShippingService';
import { inject } from 'inversify';
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  results,
} from 'inversify-express-utils';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';
import { IShipping } from '../models/ShippingModel';
import { Request } from 'express';
import { wrappedCheckRole } from '../middlewares/authorization';

@controller('/shipping')
export class ShippingController extends BaseController {
  constructor(@inject(TYPES.ShippingService) private shippingService: ShippingService) {
    super();
  }

  @Doc('Get Shipping List')
  /*
   * @desc        Get all shipments
   * @route       GET /shipping
   * @access      Public
   * @returns     List shippings Json Format
   */
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const shippings: IShipping[] = await this.shippingService.getShippingList();
      return this.json(shippings);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Create new shipment')
  /**
   * @desc          Create new shipment
   * @route         POST /shipping
   * @access        Public
   * @param request
   * @returns       Shipping Json Format
   */
  @httpPost('/', wrappedCheckRole(['Manufacturing', 'General']))
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const shipment: IShipping = await this.shippingService.createShipment(request.body);
      return this.json(shipment);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Update Shipment by ID')
  /**
   * @desc          Update Shipment by ID
   * @route         PATCH /shipping
   * @access        Public
   * @param request
   * @returns       Shipping Json Format
   */
  @httpPatch('/')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const shipment: IShipping | null = await this.shippingService.updateShipment(request.body);
      return this.json(shipment);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Delete a shipment')
  /**
   * @desc          Delete a shipment
   * @route         DELETE /shipping
   * @access        Public
   * @param request
   * @returns       Shipping JSON Format
   */
  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const shipment: IShipping | null = await this.shippingService.deleteShipment(
        request.body._id
      );
      return this.json(shipment);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
