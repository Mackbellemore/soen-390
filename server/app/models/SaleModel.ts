import { Document, Schema } from 'mongoose';
import validator from 'validator';

export interface ISale extends Document {
  bikeId: string;
  customerEmail: string;
  quantity: number;
  customerName: string;
  status: 'Fulfilled' | 'Placed' | 'Cancelled' | 'Processing';
}

export const SaleSchema: Schema = new Schema({
  bikeId: { type: Schema.Types.ObjectId, ref: 'bikes', required: true },
  customerEmail: {
    type: Schema.Types.String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  quantity: { type: Schema.Types.Number, required: true, min: 1 },
  customerName: { type: Schema.Types.String },
  status: {
    type: Schema.Types.String,
    required: true,
    enum: ['Fulfilled', 'Placed', 'Cancelled', 'Processing'],
    default: 'Placed',
  },
});
