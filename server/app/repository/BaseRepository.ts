import { Logger } from 'winston';
import { MongoConnection } from '../utils/MongoConnection';
import mongoose, { Model, Document, Schema } from 'mongoose';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { BadRequestError } from '../errors';

@injectable()
export abstract class BaseRepository<T extends Document> {
  protected abstract collectionName: string;
  protected abstract schema: Schema;
  private _model?: mongoose.Model<T>;
  @inject(TYPES.logger) protected logger: Logger;

  constructor(
    @inject(TYPES.MongoConnection)
    protected readonly connection: MongoConnection
  ) {}

  public async initialize(): Promise<void> {
    // create the collection for every sub class if not done already
    this._model = await this.connection.getModel<T>(this.collectionName, this.schema);
  }

  protected manageRepositoryError(e: Error): never {
    // log errors and eventually convert mongo errors to more readable errors
    this.logger.warn(e.message);
    throw new BadRequestError(e.message);
  }

  get model(): Model<T> {
    if (!this._model) throw new Error('Repository not initialized');

    return this._model;
  }

  // Abstracted repository CRUD functions that can be used for any collection

  public async getList(): Promise<T[]> {
    try {
      return await this.model.find().exec();
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }

  public async create(model: T): Promise<T> {
    try {
      return await this.model.create(model);
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }

  public async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id).exec();
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }

  public async delete(id: string): Promise<T | null> {
    try {
      return await this.model.findByIdAndRemove(id).exec();
    } catch (e) {
      this.manageRepositoryError(e);
    }
  }
}
