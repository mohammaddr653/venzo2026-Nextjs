//مشخصات محصولی که در سبد خرید کاربر ذخیره می شود

import mongoose from 'mongoose';

const reservedProduct = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    count: {
      type: Number,
      required: true,
    },
    //یک استرینگ از تمام مقدار ویژگی های انتخاب شده . فعلا که یک ویژگی انتخابی بیشتر نداریم ولی بعدا برای ویژگی های انتخابی تو در تو دست ما رو باز میذاره
    selectedPropertyvalString: {
      type: String,
      default: '',
    },
  },
  { _id: false },
);

export default reservedProduct;
