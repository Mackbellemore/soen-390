import { Document, Schema } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: string;
}

export interface IEmail {
  to: string[];
  subject: string;
  emailBody: string;
}

export const UserSchema: Schema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: Schema.Types.String,
    required: true,
    validate: [validator.isStrongPassword, 'Password must contain a capital, symbol and a number.'],
  },
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },

  role: {
    type: Schema.Types.String,
    enum: ['General', 'Admin'],
    default: 'General',
  },
});
