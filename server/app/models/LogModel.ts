import { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  action: string;
  date: string;
  email: string;
  mongoCollection: string;
  meta: {
    method: string;
    url: string;
    body: unknown;
    params: unknown;
  };
}

export const LogSchema: Schema = new Schema({
  action: { type: Schema.Types.String, required: true },
  date: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: true },
  mongoCollection: { type: Schema.Types.String, required: true },
  meta: { type: Schema.Types.Mixed, required: false },
});
