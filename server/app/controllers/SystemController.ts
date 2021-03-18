import { SystemService } from './../services/SystemService';
import { Request } from 'express';
import { inject } from 'inversify';
import { controller, results, httpPost } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { SentMessageInfo } from 'nodemailer';
import { BaseController } from './BaseController';
import { Doc } from 'inversify-express-doc';

@controller('/system')
export class SystemController extends BaseController {
  constructor(@inject(TYPES.SystemService) private systemService: SystemService) {
    super();
  }

  @Doc('Create Email')
  /**
   * @desc          Create Email
   * @route         POST /system/email
   * @access        Public
   * @param req
   * @returns       Email JSON Format
   */
  @httpPost('/email')
  public async email(req: Request): Promise<results.JsonResult> {
    try {
      const info: SentMessageInfo = await this.systemService.sendEmail(req.body);
      return this.json(info);
    } catch (err) {
      return this.json(err.message, 400);
    }
  }
}
