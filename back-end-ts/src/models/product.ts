import mongoose from 'mongoose';

import domPurifier from 'dompurify';
import { JSDOM } from 'jsdom';
import discountObjSchema from './discountObj.js';
import propertyObjSchema from './propertyObj.js';
const htmlPurify = domPurifier(new JSDOM().window);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: discountObjSchema, default: null },
    stock: { type: Number, required: true },
    properties: {
      type: [propertyObjSchema],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    }, //دسته بندی میتواند خالی باشد ولی محصول هیچ جا نمایش داده نمی شود
    description: { type: String },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
      default: null,
    },
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        default:null
      },
    ],
  },
  { timestamps: true },
);

productSchema.pre('validate', function (next) {
  if (this.description) {
    this.description = htmlPurify.sanitize(this.description);
  }
  next();
});

export default mongoose.model('Product', productSchema);
