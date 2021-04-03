import { Document, Schema } from 'mongoose';

export interface IProduction extends Document {
  type: string;
  componentDetail: {
    name: string;
    description: string;
    quality: string;
    color: string;
    parts: Record<string, string>;
    type: string;
    finish: string;
    grade: string;
    weightAmount: number;
    weightType: string;
    detail: string;
  };
  status: string;
  quantity: string;
  startDate: Date;
  endDate: Date;
  assemblyMachine: string;
  note: string;
}

export const ProductionSchema: Schema = new Schema({
  type: { type: Schema.Types.String, required: true, enum: ['Bike', 'Part'] },
  componentDetail: {
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: false },
    quality: { type: Schema.Types.String, required: false },
    color: { type: Schema.Types.String, required: false },
    parts: { type: Schema.Types.Mixed, required: false },
    type: { type: Schema.Types.String, required: false },
    finish: { type: Schema.Types.String, required: false },
    grade: { type: Schema.Types.String, required: false },
    weightAmount: { type: Schema.Types.Number, required: false },
    weightType: { type: Schema.Types.String, required: false, enum: ['kg', 'lb'] },
    detail: { type: Schema.Types.String, required: false },
  },
  status: {
    type: Schema.Types.String,
    required: true,
    enum: ['Ongoing', 'Complete', 'Idle', 'Cancelled'],
  },
  quantity: { type: Schema.Types.Number, required: true },
  startDate: { type: Schema.Types.Date, required: false },
  endDate: { type: Schema.Types.Date, required: false },
  assemblyMachine: { type: Schema.Types.String, required: false },
  note: { type: Schema.Types.String, required: false },
});
