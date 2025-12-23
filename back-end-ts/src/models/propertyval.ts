import { PropertyvalDocument } from '#src/types/propertyval.types.js';
import mongoose from 'mongoose';

const propertyvalSchema = new mongoose.Schema<PropertyvalDocument>(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    value: { type: String, required: true, trim: true },
    hex: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model('Propertyval', propertyvalSchema);
