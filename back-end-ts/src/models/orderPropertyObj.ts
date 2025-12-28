//ویژگی محصولات آماده پرداخت که باید تماما بصورت استاتیک ذخیره شوند .بنابراین دیگر از آیدی ها استفاده نکردیم

import mongoose from 'mongoose';
import discountObjSchema from './discountObj.js';
import {
  OrderPropertyObj,
  OrderPropertyObjSchema,
  OrderPropertyvalObj,
  OrderPropertyvalObjSchema,
} from '#src/types/orderProperty.types.js';

const orderPropertyObj = new mongoose.Schema<OrderPropertyObj>(
  {
    name: { type: String },
    specifiedVals: { type: Boolean },
    type: {
      type: String,
    },
  },
  { _id: false },
);

const orderPropertyvalObj = new mongoose.Schema<OrderPropertyvalObj>(
  {
    value: { type: String },
    hex: {
      type: String,
    },
  },
  { _id: false },
);

const orderPropertyvalObjSchema = new mongoose.Schema<OrderPropertyvalObjSchema>(
  {
    propertyval: {
      type: orderPropertyvalObj,
    },
    valueString: {
      //اگر ویژگی مقادیر مشخص نداشت مثل وزن ، ابعاد
      type: String,
    },
    price: {
      type: Number,
    },
    discount: { type: discountObjSchema },
    stock: {
      type: Number,
    },
  },
  { _id: false },
);

const orderPropertyObjSchema = new mongoose.Schema<OrderPropertyObjSchema>(
  {
    property: {
      type: orderPropertyObj,
      required: true,
    },
    selective: { type: Boolean, required: true },
    values: [orderPropertyvalObjSchema],
  },
  { _id: false },
);
export default orderPropertyObjSchema;
