import { Document, Schema } from 'mongoose';
import { materialTypes, MaterialTypes } from '../entities/Material';

export interface IOrder extends Document {
  materialType: materialTypes;
  cost: number;
  quantity: number;
  deliveryDate: Date;
  orderDate: Date;
  manufacturerName: string;
  vendorLocation: string;
  status: string;
  note: string;
}

export const OrderSchema: Schema = new Schema({
  materialType: { type: Schema.Types.String, enum: MaterialTypes, required: true },
  cost: { type: Schema.Types.Number },
  quantity: { type: Schema.Types.Number, required: true, min: 1 },
  deliveryDate: { type: Schema.Types.Date, required: true },
  orderDate: { type: Schema.Types.Date, required: true },
  manufacturerName: { type: Schema.Types.String },
  vendorLocation: { type: Schema.Types.String },
  status: {
    type: Schema.Types.String,
    enum: ['Approved', 'Pending', 'Rejected'],
    default: 'Pending',
    required: true,
  },
  note: { type: Schema.Types.String },
});
