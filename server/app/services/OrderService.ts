import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { IOrder } from '../models/OrderModel';
import { OrderRepository } from '../repository/OrderRepository';
import { NotFoundError } from '../errors';

@injectable()
export class OrderService {
  constructor(@inject(TYPES.OrderRepository) private orderRepo: OrderRepository) {}

  public async getOrders(): Promise<IOrder[]> {
    return this.orderRepo.getList();
  }

  public async createOrder(body: IOrder): Promise<IOrder> {
    return this.orderRepo.create(body);
  }

  public async updateOrder(id: string, body: IOrder): Promise<IOrder> {
    const updateOrder = await this.orderRepo.update(id, body);
    if (!updateOrder) {
      throw new NotFoundError(`Bike with id ${id} was not found`);
    }

    return updateOrder;
  }

  public async deleteOrder(body: IOrder): Promise<IOrder | null> {
    const deletedOrder = await this.orderRepo.delete(body.id);
    if (!deletedOrder) {
      throw new NotFoundError(`Order with id ${body.id} was not found`);
    }

    return deletedOrder;
  }

  public async findById(id: string): Promise<IOrder> {
    const order = await this.orderRepo.findById(id);
    if (!order) {
      throw new NotFoundError(`Order with id ${id} was not found`);
    }

    return order;
  }
}
