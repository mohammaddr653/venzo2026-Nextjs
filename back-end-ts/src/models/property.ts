import { IPropertyDocument } from '#src/types/property.types.js';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema<IPropertyDocument>({
  name: { type: String, required: true },
  specifiedVals: { type: Boolean, required: true, default: true },
  type: {
    type: String,
    enum: ['ordinary', 'color'],
    required: true,
    default: 'ordinary',
  },
});
export default mongoose.model('Property', propertySchema);
