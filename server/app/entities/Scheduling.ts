import { BadRequestError } from '../errors';
import Joi from 'joi';
import { PartTypes } from './Part';
import { IScheduling } from '../models/SchedulingModel';

export default class SchedulingEntity {
  // Optional schema to validate Patch requests
  private static optionalSchema = Joi.object().keys({
    partType: Joi.string().valid(...PartTypes),
    quantity: Joi.number().integer().greater(-1),
    cost: Joi.number().integer().greater(-1),
    startTime: Joi.string(),
    endTime: Joi.string(),
    frequency: Joi.string(),
    machineName: Joi.string(),
  });

  // create a second schema purely just for POST requests
  private static requiredSchema = SchedulingEntity.optionalSchema.fork(
    ['partType', 'quantity', 'cost'],
    (schema) => schema.required()
  );

  public static async validate(body: unknown, method: 'patch' | 'post'): Promise<IScheduling> {
    try {
      const schema = method === 'patch' ? this.optionalSchema : this.requiredSchema;
      const scheduleEntity = await schema.validateAsync(body);
      return scheduleEntity as IScheduling;
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  }
}
