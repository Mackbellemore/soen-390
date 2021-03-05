import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { IOrder } from '../models/OrderModel';
import { OrderRepository } from '../repository/OrderRepository';
import { NotApprovedError, NotFoundError } from '../errors';
import { MaterialService } from './MaterialService';
import { IMaterial } from '../models/MaterialModel';
import { materialCost } from '../entities/Material';

@injectable()
export class OrderService {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepo: OrderRepository,
    @inject(TYPES.MaterialService) private materialService: MaterialService
  ) {}

  public async getOrders(): Promise<IOrder[]> {
    return this.orderRepo.getList();
  }

  public async createOrder(body: IOrder): Promise<IOrder> {
    if (!materialCost[body.materialType]) {
      throw new NotFoundError(`Material ${body.materialType} was not found`);
    }
    body.cost = Object.values(materialCost[body.materialType])[0];
    return this.orderRepo.create(body);
  }

  public async updateOrder(id: string, body: IOrder): Promise<IOrder> {
    if (!materialCost[body.materialType]) {
      throw new NotFoundError(`Material ${body.materialType} was not found`);
    }
    body.cost = Object.values(materialCost[body.materialType])[0];
    const updateOrder = await this.orderRepo.update(id, body);
    if (!updateOrder) {
      throw new NotFoundError(`Order with id ${id} was not found`);
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

  public async approveOrder(body: IOrder): Promise<IOrder> {
    if (body.status !== 'Approved') {
      throw new NotApprovedError(`Order with id ${body.id} was not approved`);
    }

    const orderApproved = await this.orderRepo.update(body.id, body);

    if (!orderApproved) {
      throw new NotFoundError(`Order with id ${body.id} was not found`);
    }

    if (orderApproved.status === 'Approved') {
      const material: IMaterial = await this.materialService.findMaterial(
        orderApproved.materialType
      );

      material.stock += orderApproved.quantity;
      this.materialService.updateMaterial(material.name, { stock: material.stock } as IMaterial);
    }

    return orderApproved;
  }
}
