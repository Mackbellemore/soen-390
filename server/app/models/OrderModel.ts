import { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  componentName: string;
  option1: string;
  option2: string;
  quantity: number;
  cost: number;
  deliveryDate: Date;
  orderDate: Date;
  manufactureName: string;
  note: string;
}
export const OrderSchema: Schema = new Schema({
  componentName: { type: Schema.Types.String, required: true },
  option1: { type: Schema.Types.String },
  option2: { type: Schema.Types.String },
  quantity: { type: Schema.Types.Number, required: true, min: 1 },
  cost: { type: Schema.Types.Number, required: true, min: 1 },
  deliveryDate: { type: Schema.Types.Date, required: true },
  orderDate: { type: Schema.Types.Date, required: true },
  manufactureName: { type: Schema.Types.String },
  note: { type: Schema.Types.String },
});
