import { IEmail } from './../models/UserModel';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import config from 'config';
import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@injectable()
export class SystemService {
  constructor(@inject(TYPES.Mail) private transporter: Mail) {}

  public async sendEmail(body: IEmail): Promise<SentMessageInfo> {
    const emailList = body.to.join(', ');

    const emailDetails = {
      from: `no-reply@ERPSystem TEAM07 <${config.get<string>('email.user')}>`,
      to: emailList,
      subject: body.subject,
      text: body.emailBody,
    };
    return this.transporter.sendMail(emailDetails);
  }
}
