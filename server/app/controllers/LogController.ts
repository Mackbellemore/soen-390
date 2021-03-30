import { inject } from 'inversify';
import { controller, httpGet, httpPost, results } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';
import { ILog } from '../models/LogModel';
import { LogService } from './../services/LogService';
import { Request } from 'express';

@controller('/logs')
export class LogController extends BaseController {
  constructor(@inject(TYPES.LogService) private logService: LogService) {
    super();
  }

  @Doc('Get logs')
  /**
   * @desc        Get all logs
   * @route       GET /logs
   * @access      Public
   * @returns     List logs Json Format
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

  @Doc('Add log')
  /**
   * @desc        Create a log
   * @route       POST /logs
   * @access      Public
   * @returns     status code
   */
  @httpPost('/')
  public async post(req: Request): Promise<results.JsonResult> {
    try {
      await this.logService.addLog(req.body);
      return this.json(200);
    } catch (err) {
      return this.handleError(err);
    }
  }
}
