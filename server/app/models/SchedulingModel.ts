import { partType } from '../entities/Part';
import { Document, Schema } from 'mongoose';

export interface IScheduling extends Document {
  partType: partType;
  quantity: number;
  cost: number;
  startTime: Date;
  endTime: Date;
  machineName: string;
  frequency: string;
}

export const SchedulingSchema: Schema = new Schema({
  partType: { type: Schema.Types.String, required: true, immutable: true },
  quantity: { type: Schema.Types.Number, required: true, min: 1 },
  cost: { type: Schema.Types.Number, required: true, min: 1 },
  startTime: { type: Schema.Types.Date, required: true },
  endTime: { type: Schema.Types.Date, required: true },
  machineName: { type: Schema.Types.String, required: true },
  frequency: { type: Schema.Types.String, required: true },
});
