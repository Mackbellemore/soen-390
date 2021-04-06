import { Document, Schema } from 'mongoose';

export interface IProduction extends Document {
  type: string;
  componentId: string;
  status: string;
  quantity: string;
  startDate: Date;
  endDate: Date;
  assemblyMachine: string;
  note: string;
}

export const ProductionSchema: Schema = new Schema({
  type: { type: Schema.Types.String, required: true, enum: ['Bike', 'Part'] },
  componentId: { type: Schema.Types.String, required: true },
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
