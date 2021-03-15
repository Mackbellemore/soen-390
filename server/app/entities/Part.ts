import { IPart } from './../models/PartModel';
import Joi from 'joi';
import { BadRequestError } from '../errors';

const PartTypes = [
  'handle_bar',
  'wheels',
  'chain',
  'frame',
  'pedal',
  'brakes',
  'seat',
  'fork',
] as const;

export type partType = typeof PartTypes[number];

export default class PartEntity {
  // Optional schema to validate Patch requests
  private static optionalSchema = Joi.object().keys({
    name: Joi.string(),
    quality: Joi.string(),
    description: Joi.string(),
    type: Joi.string().valid(...PartTypes),
    color: Joi.string(),
    finish: Joi.string(),
    grade: Joi.string(),
    detail: Joi.string(),
    stock: Joi.number().integer().greater(-1).less(100),
    defectId: Joi.string(),
  });

  // create a second schema purely just for POST requests
  private static requiredSchema = PartEntity.optionalSchema.fork(
    ['name', 'type', 'quality', 'stock'],
    (schema) => schema.required()
  );

  public static async validate(body: unknown, method: 'patch' | 'post'): Promise<IPart> {
    try {
      const schema = method === 'patch' ? this.optionalSchema : this.requiredSchema;
      const partEntity = await schema.validateAsync(body);
      return partEntity as IPart;
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  }
}
