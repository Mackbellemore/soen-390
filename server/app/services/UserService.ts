import { IUserEntity, UserEntity } from './../entities/User';
import { IUser, IEmail } from './../models/UserModel';
import { UserRepository } from './../repository/UserRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import bcrypt from 'bcryptjs';
import { IConfig } from 'config';
import nodemailer from 'nodemailer'

@injectable()
export class UserService {
  @inject(TYPES.config) private config: IConfig;
  constructor(@inject(TYPES.UserRepository) private userRepo: UserRepository) {}

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

  public async sendEmail(body:IEmail): Promise<void>{

    const emailList = body.to.join(", ")

    //initialize transporter once (refactor)
    // put credentials in .env file
    const transport = {
      service: 'gmail',
      auth:{
        user: 'soen390.team07@gmail.com',
        pass: 'ERP_Soen390-team07'
      }
    }
    const transporter = nodemailer.createTransport(transport)

    const emailDetails ={
      from: 'no-reply@ERPSystem TEAM07',
      to: emailList,
      subject: body.subject,
      text: body.emailBody
    }

    transporter.sendMail(emailDetails, (err, data)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("email sent "+data)
      }
    })
  }
}
