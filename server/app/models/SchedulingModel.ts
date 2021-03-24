import { partType } from '../entities/Part';
import { Document, Schema } from 'mongoose';

export interface IScheduling extends Document {
  partType: partType;
  quantity: number;
  cost: number;
  operatingTime: Date;
}
export const SchedulingSchema: Schema = new Schema({
  partType: { type: Schema.Types.String, required: true, immutable: true },
  quantity: { type: Schema.Types.Number, required: true, min: 1 },
  cost: { type: Schema.Types.Number, required: true, min: 1 },
  operatingTime: { type: Schema.Types.Date, required: true },
});
