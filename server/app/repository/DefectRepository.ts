import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { IDefect, DefectSchema } from '../models/DefectModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class DefectRepository extends BaseRepository<IDefect> {
  protected readonly collectionName: string = 'defects';
  protected readonly schema: Schema = DefectSchema;
}
