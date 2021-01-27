import mongoose, { Document, Schema } from 'mongoose';

export interface ITest extends Document {
  description: string;
}
const TestSchema: Schema = new Schema({
  description: { type: Schema.Types.String, required: false },
});

export default mongoose.model<ITest>('Test', TestSchema);
