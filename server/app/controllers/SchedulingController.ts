import { SchedulingService } from '../services/SchedulingService';
import { Request } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpDelete,
  results,
  httpPost,
  httpPatch,
} from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import { IScheduling } from '../models/SchedulingModel';
import SchedulingEntity from '../entities/Scheduling';

@controller('/scheduling')
export class SchedulingController extends BaseController {
  constructor(@inject(TYPES.SchedulingService) private schedulingService: SchedulingService) {
    super();
  }

  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const schedulings: IScheduling[] = await this.schedulingService.getSchedulings();
      return this.json(schedulings);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPost('/')
  public async post(request: Request): Promise<results.JsonResult> {
    try {
      const validPartBody = await SchedulingEntity.validate(request.body, 'post');
      const scheduling: IScheduling = await this.schedulingService.createScheduling(validPartBody);
      return this.json(scheduling);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpDelete('/')
  public async delete(request: Request): Promise<results.JsonResult> {
    try {
      const scheduling = await this.schedulingService.deleteScheduling(request.body);

      return this.json(scheduling);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpPatch('/:id')
  public async update(request: Request): Promise<results.JsonResult> {
    try {
      const validPartBody = await SchedulingEntity.validate(request.body, 'patch');
      const scheduling: IScheduling | null = await this.schedulingService.updateScheduling(
        request.params.id,
        validPartBody
      );
      return this.json(scheduling);
    } catch (err) {
      return this.handleError(err);
    }
  }

  @httpGet('/:id')
  public async getById(request: Request): Promise<results.JsonResult> {
    try {
      const scheduling: IScheduling = await this.schedulingService.findById(request.params.id);
      return this.json(scheduling);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
