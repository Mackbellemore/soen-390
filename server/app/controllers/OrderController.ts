import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpDelete,
  results,
  httpPost,
  httpPatch,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import { OrderService } from '../services/OrderService';
import { IOrder } from '../models/OrderModel';
import { materialCost } from '../entities/Material';

@controller('/orders')
export class OrderController extends BaseController {
  constructor(@inject(TYPES.OrderService) private orderService: OrderService) {
    super();
  }

  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const orders: IOrder[] = await this.orderService.getOrders();
      return this.json(orders);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder = await this.orderService.createOrder(request.body);
      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder | null = await this.orderService.deleteOrder(request.body);

      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPatch('/:id')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder | null = await this.orderService.updateOrder(
        request.params.id,
        request.body
      );
      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpGet('/materialList')
  public async getMaterialList(): Promise<results.JsonResult> {
    return this.json(materialCost);
  }

  @httpGet('/:id')
  public async getById(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder = await this.orderService.findById(request.params.id);
      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPost('/approved')
  public async approve(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder | null = await this.orderService.approveOrder(request.body);
      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
