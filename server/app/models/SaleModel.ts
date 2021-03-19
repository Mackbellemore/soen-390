import { Document, Schema } from 'mongoose';
import validator from 'validator';

export interface ISale extends Document {
  bikeId: string;
  customerEmail: string;
}

export const SaleSchema: Schema = new Schema({
  bikeId: { type: Schema.Types.ObjectId, ref: 'bikes' },
  email: {
    type: Schema.Types.String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
});
