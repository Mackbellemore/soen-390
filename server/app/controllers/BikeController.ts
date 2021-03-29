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
import { Doc } from 'inversify-express-doc';

@controller('/bikes')
export class BikeController extends BaseController {
  constructor(@inject(TYPES.BikeService) private bikeService: BikeService) {
    super();
  }

  @Doc('Get All Bike')
  /*
   * @desc        Get all bikes
   * @route       GET /bikes
   * @access      Public
   * @returns     List Bikes Json Format
   */
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const bikes: IBike[] = await this.bikeService.getBikes();
      return this.json(bikes);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Create new Bike')
  /**
   * @desc          Create new Bike
   * @route         POST /bikes
   * @access        Public
   * @param request
   * @returns       Bike Json Format
   */
  @httpPost('/', TYPES.LoggerMiddleware)
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const validBikeBody = await BikeEntity.validate(request.body, 'post');
      const bike: IBike = await this.bikeService.createBike(validBikeBody);
      return this.json(bike);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Delete Bike')
  /**
   * @desc          Delete Bike
   * @route         DELETE /bikes
   * @access        Public
   * @param request
   * @returns       Bike Json Format
   */
  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const bike: IBike | null = await this.bikeService.deleteBike(request.body);

      return this.json(bike);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @Doc('Update Bike by ID')
  /**
   * @desc          Update Bike by ID
   * @route         PATCH /bikes
   * @access        Public
   * @param request
   * @returns       Bike Json Format
   */
  @httpPatch('/:id', TYPES.LoggerMiddleware)
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

  @Doc('Get Bike by ID')
  /**
   * @desc          Update Bike by ID
   * @route         GET /bikes
   * @access        Public
   * @param request
   * @returns       Bike Json Format
   */
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
