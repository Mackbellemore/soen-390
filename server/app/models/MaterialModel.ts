import { Document, Schema } from 'mongoose';

export interface IMaterial extends Document {
  description: string;
  name: string;
  stock: number;
  weight: string;
  price: number;
}

export const MaterialSchema: Schema = new Schema({
  description: { type: Schema.Types.String },
  name: { type: Schema.Types.String, required: true, unique: true, immutable: true },
  stock: { type: Schema.Types.Number, required: true },
  weight: { type: Schema.Types.String, required: true, enum: ['kg', 'lb'] },
  price: { type: Schema.Types.Number, required: true },
});
