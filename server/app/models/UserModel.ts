import { Document, Schema } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: string;
  approved: boolean;
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
  },
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  role: {
    type: Schema.Types.String,
    enum: ['General', 'Admin', 'Finance', 'Manufacturing'],
    default: 'General',
  },
  approved: {
    type: Schema.Types.Boolean,
    default: false,
    required: true,
  },
});
