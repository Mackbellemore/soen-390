import { Document, Schema } from 'mongoose';

export interface IDefect extends Document {
  id: number;
  type: 'Broken' | 'Reparable';
  status: 'Solved' | 'Pending' | 'Ongoing';
  description: string;
  partName: string;
}

export const DefectSchema: Schema = new Schema({
  id: { type: Schema.Types.Number, required: true, unique: true, immutable: true },
  type: { type: Schema.Types.String, required: true },
  status: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: false },
  partName: { type: Schema.Types.String, required: true },
});
