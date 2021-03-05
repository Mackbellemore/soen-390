import { Document, Schema } from 'mongoose';
import { MaterialTypes, materialTypes } from '../entities/Material';

export interface IOrder extends Document {
  material: materialTypes;
  quantity: number;
  cost: number;
  deliveryDate: Date;
  orderDate: Date;
  manufactureName: string;
  status: string;
  note: string;
}
export const OrderSchema: Schema = new Schema({
  material: { type: Schema.Types.String, enum: MaterialTypes, required: true },
  quantity: { type: Schema.Types.Number, required: true, min: 1 },
  cost: { type: Schema.Types.Number, required: true, min: 1 },
  deliveryDate: { type: Schema.Types.Date, required: true },
  orderDate: { type: Schema.Types.Date, required: true },
  manufactureName: { type: Schema.Types.String },
  status: { type: Schema.Types.String, enum: ['Approved', 'Pending', 'Rejected'], required: true },
  note: { type: Schema.Types.String },
});
