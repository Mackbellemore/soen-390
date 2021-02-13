import { SystemService } from './../services/SystemService';
import { Request } from 'express';
import { inject } from 'inversify';
import { controller, BaseHttpController, results, httpPost } from 'inversify-express-utils';
import TYPES from '../constants/types';
import { SentMessageInfo } from 'nodemailer';

@controller('/system')
export class SystemController extends BaseHttpController {
  constructor(@inject(TYPES.SystemService) private systemService: SystemService) {
    super();
  }

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