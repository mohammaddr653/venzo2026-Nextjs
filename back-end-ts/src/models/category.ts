import { ICategoryDocument } from '#src/types/category.types.js';
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema<ICategoryDocument>(
  {
    name: { type: String, required: true },
    motherId: {
      type: mongoose.Schema.Types.Mixed,
      default: 'root',
      validate: {
        validator: function (value: string | mongoose.Types.ObjectId) {
          return value === 'root' || value instanceof mongoose.Types.ObjectId;
        },
      },
      ref: 'Category',
    },
    type: {
      type: String,
      required: true,
      enum: ['link', 'shop', 'archive', 'box'],
    },
    link: {
      type: String,
      validate: {
        validator: function (value: string) {
          if (this.type === 'link') {
            return typeof value === 'string' && value.trim().length > 0;
          }
          return true;
        },
      },
    },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
      default: null,
    },
    display: {
      type: String,
      enum: ['mega-menu', 'ordinary'],
      required: true,
      default: 'ordinary',
    },
  },
  { timestamps: true },
);
export default mongoose.model('Category', categorySchema);
