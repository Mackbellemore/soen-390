import { BaseHttpController, results } from 'inversify-express-utils';
import { BadRequestError, NotFoundError, ConflictError } from '../errors';

export class BaseController extends BaseHttpController {
  protected handleError(err: Error): results.JsonResult {
    if (err instanceof NotFoundError) {
      return this.json(err.message, 404);
    }

    if (err instanceof BadRequestError) {
      return this.json(err.message, 400);
    }

    if (err instanceof ConflictError) {
      return this.json(err.message, 409);
    }

    return this.json(err.message, 500);
  }
}
