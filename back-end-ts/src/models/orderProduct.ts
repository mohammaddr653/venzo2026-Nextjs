//محصول آماده پرداخت

import mongoose from 'mongoose';
import discountObjSchema from './discountObj.js';
import orderPropertyObjSchema from './orderPropertyObj.js';
import { OrderProduct } from '#src/types/order.types.js';

const orderProduct = new mongoose.Schema<OrderProduct>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: discountObjSchema, default: null },
    properties: {
      type: [orderPropertyObjSchema],
    },
    count: {
      type: Number,
      required: true,
    },
    //آیدی مقدار ویژگی انتخاب شده
    selectedPropertyvalString: {
      type: String,
      default: '',
    },
    //مقدار ویژگی انتخاب شده
    selectedPropertyval: {
      type: String,
      default: '',
    },
  },
  { _id: false },
);

export default orderProduct;
