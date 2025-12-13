import mongoose from 'mongoose';
import urlsObjSchema from './urlsObj.js';

const mediaSchema = new mongoose.Schema(
  {
    urls: { type: urlsObjSchema, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Media', mediaSchema);
