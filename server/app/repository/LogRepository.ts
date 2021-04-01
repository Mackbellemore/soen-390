import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { ILog, LogSchema } from '../models/LogModel';
import { BaseRepository } from './BaseRepository';

@injectable()
export class LogRepository extends BaseRepository<ILog> {
  protected readonly collectionName: string = 'logs';
  protected readonly schema: Schema = LogSchema;
}
