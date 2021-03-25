import { Document, Schema } from 'mongoose';

export interface IMachine extends Document {
  machineName: string;
  duration: number;
}

export const MachineSchema: Schema = new Schema({
  machineName: { type: Schema.Types.String, required: true },
  duration: { type: Schema.Types.Number, required: true },
});
