import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IPart, PartSchema } from './../models/PartModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class PartRepository extends BaseRepository<IPart> {
  protected readonly collectionName: string = 'parts';
  protected readonly schema: Schema = PartSchema;
}
