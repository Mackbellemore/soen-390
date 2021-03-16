import { Document, Schema } from 'mongoose';

export interface IProduction extends Document {
  status: string;
  orderID: number;
  component: string;
  option1: string;
  option2: string;
  quantity: string;
  expectedStartDate: Date;
  expectedEndDate: Date;
  actualStartDate: Date;
  actualEndDate: Date;
  manufacture: string;
  note: string;
}

export const ProductionSchema: Schema = new Schema({
  status: { type: Schema.Types.String, required: true, enum: ['Ongoing', 'Complete', 'Idle'] },
  orderID: { type: Schema.Types.Number, required: true, unique: true, immutable: true },
  component: { type: Schema.Types.String, required: true },
  option1: { type: Schema.Types.String, required: false },
  option2: { type: Schema.Types.String, required: false },
  quantity: { type: Schema.Types.String, required: true },
  expectedStartDate: { type: Schema.Types.Date, required: true },
  expectedEndDate: { type: Schema.Types.Date, required: true },
  actualStartDate: { type: Schema.Types.Date, required: true },
  actualEndDate: { type: Schema.Types.Date, required: true },
  manufacture: { type: Schema.Types.String, required: true },
  note: { type: Schema.Types.String, required: false },
});
