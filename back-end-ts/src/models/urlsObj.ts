import { IUrlObjDocument, IUrlsObjDocument } from '#src/types/urlsObj.types.js';
import mongoose from 'mongoose';

const urlObj = new mongoose.Schema<IUrlObjDocument>({
  width: { type: String, required: true },
  height: { type: String, required: true },
  url: { type: String, required: true },
});

const urlsObjSchema = new mongoose.Schema<IUrlsObjDocument>(
  {
    original: { type: urlObj, required: true },
    small: { type: urlObj, default: null },
    medium: { type: urlObj, default: null },
    large: { type: urlObj, default: null },
  },
  { _id: false },
);
export default urlsObjSchema;
