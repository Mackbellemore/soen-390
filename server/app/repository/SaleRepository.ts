import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { ISale, SaleSchema } from '../models/SaleModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class SaleRepository extends BaseRepository<ISale> {
  protected readonly collectionName: string = 'sales';
  protected readonly schema: Schema = SaleSchema;
}
