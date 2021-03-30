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
import { Doc } from 'inversify-express-doc';

@controller('/orders')
export class OrderController extends BaseController {
  constructor(@inject(TYPES.OrderService) private orderService: OrderService) {
    super();
  }

  @Doc('Get All Orders')
  /**
   * @desc        Get all orders
   * @route       GET /orders
   * @access      Public
   * @returns     List of Orders JSON format
   */
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const orders: IOrder[] = await this.orderService.getOrders();
      return this.json(orders);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Create new Order')
  /**
   * @desc          Create new order
   * @route         POST /orders
   * @access        Public
   * @param request
   * @returns       Order JSON Format
   */
  @httpPost('/', TYPES.LoggerMiddleware)
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder = await this.orderService.createOrder(request.body);
      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Delete an Order')
  /**
   * @desc          Delete an Order
   * @route         DELETE /orders
   * @access        Public
   * @param request
   * @returns       Order JSON Format
   */
  @httpDelete('/', TYPES.LoggerMiddleware)
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder | null = await this.orderService.deleteOrder(request.body);

      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Update Order by ID')
  /**
   * @desc          Update an Order by ID
   * @route         Patch /orders/:id
   * @access        Public
   * @param request
   * @returns       Order JSON Format
   */
  @httpPatch('/:id', TYPES.LoggerMiddleware)
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

  @Doc('Get All Material List')
  /*
   * @desc        Gets the material list rules to create a type of part
   * @route       GET /orders/materialList
   * @access      Public
   */
  @httpGet('/materialList')
  public async getMaterialList(): Promise<results.JsonResult> {
    return this.json(materialCost);
  }

  @Doc('Get an Order by ID')
  /**
   * @desc          Delete Order by ID
   * @route         DELETE /orders/:id
   * @access        Public
   * @param request
   * @returns       Order JSON Format
   */
  @httpGet('/:id')
  public async getById(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder = await this.orderService.findById(request.params.id);
      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Approve an Order')
  /**
   * @desc          Approves an order
   * @route         POST  /orders/approved
   * @access        Public
   * @param request
   * @returns       Order JSON Format
   */
  @httpPost('/approved', TYPES.LoggerMiddleware)
  public async approve(request: Request): Promise<results.JsonResult> {
    try {
      const order: IOrder | null = await this.orderService.approveOrder(request.body);
      return this.json(order);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
