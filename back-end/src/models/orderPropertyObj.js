//ویژگی محصولات آماده پرداخت که باید تماما بصورت استاتیک ذخیره شوند .بنابراین دیگر از آیدی ها استفاده نکردیم
const mongoose = require("mongoose");
const discountObjSchema = require("./discountObj");

const orderPropertyObj = new mongoose.Schema(
  {
    name: { type: String },
    specifiedVals: { type: Boolean },
    type: {
      type: String,
    },
  },
  { _id: false }
);

const orderPropertyvalObj = new mongoose.Schema(
  {
    value: { type: String },
    hex: {
      type: String,
    },
  },
  { _id: false }
);

const orderPropertyvalObjSchema = new mongoose.Schema(
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
  { _id: false }
);

const orderPropertyObjSchema = new mongoose.Schema(
  {
    property: {
      type: orderPropertyObj,
      required: true,
    },
    selective: { type: Boolean, required: true },
    values: [orderPropertyvalObjSchema],
  },
  { _id: false }
);
module.exports = orderPropertyObjSchema;
