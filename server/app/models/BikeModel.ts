import mongoose, { Document, Schema } from 'mongoose';

export interface IBike extends Document {
  description: string;
  weight: number;
  color: string;
}
const BikeSchema: Schema = new Schema({
  description: { type: Schema.Types.String, required: true },
  weight: { type: Schema.Types.Number, required: true },
  color: { type: Schema.Types.String, required: true },
});

export default mongoose.model<IBike>('Bike', BikeSchema);
