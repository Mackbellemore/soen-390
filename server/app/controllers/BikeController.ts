import { IBike } from './../models/BikeModel';
import { BikeService } from './../services/BikeService';
import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPatch,
  httpDelete,
  BaseHttpController,
  results,
  httpPost,
} from 'inversify-express-utils';
import TYPES from '../constants/types';

@controller('/bikes')
export class BikeController extends BaseHttpController {
  constructor(@inject(TYPES.BikeService) private bikeService: BikeService) {
    super();
  }

  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const bikes: IBike[] = await this.bikeService.getBikes();
      return this.json(bikes);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }

  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const bike: IBike = await this.bikeService.createBike(request.body);
      return this.json(bike);
    } catch (err) {
      return this.json(err.message, 400);
      
    }
  }

  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const bike: IBike | null = await this.bikeService.deleteBike(request.body);

      return this.json(bike);
    } catch (err) {
      return this.json(err.message, 404);
    }
  }

  @httpPatch('/:id')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const bike: IBike | null = await this.bikeService.updateBike(request.params.id, request.body);
      return this.json(bike);
    } catch (err) {
      return this.json(err.message, 404);
      
    }
  }
}
