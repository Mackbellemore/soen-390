import { partType } from '../entities/Part';
import { Document, Schema } from 'mongoose';

export interface IPart extends Document {
  name: string;
  quality: string;
  description: string;
  type: partType;
  color: string;
  finish: string;
  grade: string;
  detail: string;
  stock: number;
}

export const PartSchema: Schema = new Schema({
  name: { type: Schema.Types.String, required: true, unique: true, immutable: true },
  quality: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: false },
  type: { type: Schema.Types.String, required: true },
  color: { type: Schema.Types.String, required: false },
  finish: { type: Schema.Types.String, required: false },
  grade: { type: Schema.Types.String, required: false },
  detail: { type: Schema.Types.String, required: false },
  stock: { type: Schema.Types.Number, required: true },
});
