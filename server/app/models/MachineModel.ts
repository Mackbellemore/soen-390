import { Document, Schema } from 'mongoose';

export interface IMachine extends Document {
  machineName: string;
  status: string;
}

export const MachineSchema: Schema = new Schema({
  machineName: { type: Schema.Types.String, required: true },
  status: { type: Schema.Types.String, required: true },
});
