import { IBike } from './../models/BikeModel';
import { BikeService } from './../services/BikeService';
import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPatch,
  httpDelete,
  results,
  httpPost,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import BikeEntity from '../entities/Bike';

@controller('/bikes')
export class BikeController extends BaseController {
  constructor(@inject(TYPES.BikeService) private bikeService: BikeService) {
    super();
  }

  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const bikes: IBike[] = await this.bikeService.getBikes();
      return this.json(bikes);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const validBikeBody = await BikeEntity.validate(request.body, 'post');
      const bike: IBike = await this.bikeService.createBike(validBikeBody);
      return this.json(bike);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const bike: IBike | null = await this.bikeService.deleteBike(request.body);

      return this.json(bike);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPatch('/:id')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const validBikeBody = await BikeEntity.validate(request.body, 'patch');
      const bike: IBike | null = await this.bikeService.updateBike(
        request.params.id,
        validBikeBody
      );
      return this.json(bike);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpGet('/:id')
  public async getById(request: Request): Promise<results.JsonResult> {
    try {
      const bike: IBike = await this.bikeService.findById(request.params.id);
      return this.json(bike);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
