import { inject } from 'inversify';
import { controller, httpGet, results } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';
import { ILog } from '../models/LogModel';
import { LogService } from './../services/LogService';

@controller('/logs')
export class LogController extends BaseController {
  constructor(@inject(TYPES.LogService) private logService: LogService) {
    super();
  }

  @Doc('Get logs')
  /**
   * @desc        Get all defect
   * @route       GET /defects
   * @access      Public
   * @returns     List Defects Json Format
   */
  @httpGet('/')
  public async get(): Promise<results.JsonResult> {
    try {
      const logs: ILog[] = await this.logService.getLogs();
      return this.json(logs);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
