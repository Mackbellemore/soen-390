import { IBike } from './../models/BikeModel';
import Joi from 'joi';
import { BadRequestError } from '../errors';

export default class BikeEntity {
  // Optional schema to validate Patch requests
  private static optionalSchema = Joi.object().keys({
    name: Joi.string().trim(),
    description: Joi.string(),
    weightAmount: Joi.number().integer().greater(0).less(50),
    weightType: Joi.string().valid(...['kg', 'lb']),
    sellingPrice: Joi.number().greater(0),
    costPrice: Joi.number().greater(0),
    color: Joi.string(),
    parts: Joi.object({
      // type is of string since it will be associated to a part's name
      handle_bar: Joi.string(),
      wheels: Joi.string(),
      chain: Joi.string(),
      frame: Joi.string(),
      brakes: Joi.string(),
      seat: Joi.string(),
      fork: Joi.string(),
      pedal: Joi.string(),
    }),
    stock: Joi.number().integer().greater(-1).less(100),
  });

  // create a second schema purely just for POST requests
  private static requiredSchema = BikeEntity.optionalSchema.fork(
    [
      'name',
      'weightAmount',
      'weightType',
      'stock',
      'color',
      'parts.handle_bar',
      'parts.wheels',
      'parts.chain',
      'parts.frame',
      'parts.brakes',
      'parts.seat',
      'parts.fork',
    ],
    (schema) => schema.required()
  );

  public static async validate(body: unknown, method: 'update' | 'create'): Promise<IBike> {
    try {
      const schema = method === 'update' ? this.optionalSchema : this.requiredSchema;
      const bikeEntity = await schema.validateAsync(body);
      return bikeEntity as IBike;
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  }
}
