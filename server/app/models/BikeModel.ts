import { Document, Schema } from 'mongoose';

export interface IBike extends Document {
  name: string;
  description: string;
  weightAmount: number;
  weightType: string;
  sellingPrice: number;
  costPrice: number;
  color: string;
  parts: Record<string, string>;
  stock: number;
  profitMargin: number;
}

export const BikeSchema: Schema = new Schema({
  name: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String },
  weightAmount: { type: Schema.Types.Number, required: true, min: 1 },
  weightType: { type: Schema.Types.String, required: true, enum: ['kg', 'lb'] },
  sellingPrice: { type: Schema.Types.Number, required: true, min: 1 },
  costPrice: { type: Schema.Types.Number, required: true, min: 1 },
  color: { type: Schema.Types.String, required: true },
  stock: { type: Schema.Types.Number, required: true },
  parts: { type: Schema.Types.Mixed, required: true },
});
