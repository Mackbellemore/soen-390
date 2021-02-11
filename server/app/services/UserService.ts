import { IUserEntity, UserEntity } from './../entities/User';
import { IUser, IEmail } from './../models/UserModel';
import { UserRepository } from './../repository/UserRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import bcrypt from 'bcryptjs';
import config, { IConfig } from 'config';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@injectable()
export class UserService {
  private transporter: Mail;
  @inject(TYPES.config) private config: IConfig;
  constructor(@inject(TYPES.UserRepository) private userRepo: UserRepository) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'soen390.team07@gmail.com',
        pass: config.get<string>('mail'),
      },
    });
  }

  public async registerUser(body: IUser): Promise<IUserEntity> {
    if (!body.password) {
      throw new Error('Password missing in body');
    }

    const salt = await bcrypt.genSalt(this.config.get<number>('salt'));
    const hash = await bcrypt.hash(body.password, salt);
    body.password = hash;

    const user = await this.userRepo.create(body);
    return UserEntity.buildUser(user);
  }

  public async loginUser(body: IUser): Promise<IUserEntity> {
    const user: IUser = await this.userRepo.findByEmail(body);
    if (!body.password) throw new Error('Password missing from request');

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      throw Error('Username or password is invalid');
    }

    return UserEntity.buildUser(user);
  }

  public async sendEmail(body: IEmail): Promise<SentMessageInfo> {
    const emailList = body.to.join(', ');

    const emailDetails = {
      from: 'no-reply@ERPSystem TEAM07 <soen390.team07@gmail.com>',
      to: emailList,
      subject: body.subject,
      text: body.emailBody,
    };
    return await this.transporter.sendMail(emailDetails);
  }
}
