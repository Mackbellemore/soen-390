import { IMaterial, MaterialSchema } from './../models/MaterialModel';
import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { BaseRepository } from './BaseRepository';

@injectable()
export class MaterialRepository extends BaseRepository<IMaterial> {
  protected readonly collectionName: string = 'materials';
  protected readonly schema: Schema = MaterialSchema;
}
