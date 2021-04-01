import { Document, Schema } from 'mongoose';

export interface IDefect extends Document {
  id: number;
  type: 'Broken' | 'Reparable';
  status: 'Solved' | 'Pending' | 'Ongoing';
  description: string;
  partName: string;
}
export interface IBikeDefect {
  bike: string;
  defects: IDefect[];
}

export const DefectSchema: Schema = new Schema({
  id: { type: Schema.Types.Number, required: true, unique: true, immutable: true },
  type: { type: Schema.Types.String, required: true },
  status: {
    type: Schema.Types.String,
    required: true,
    enum: ['Solved', 'Pending', 'Ongoing'],
    default: 'Pending',
  },
  description: { type: Schema.Types.String, required: false },
  partName: { type: Schema.Types.String, required: true },
});
