import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { SaleRepository } from './../repository/SaleRepository';
import { ISale } from './../models/SaleModel';

@injectable()
export class SaleService {
  constructor(@inject(TYPES.SaleRepository) private saleRepo: SaleRepository) {}

  public async getSales(): Promise<ISale[]> {
    return this.saleRepo.getList();
  }
}
