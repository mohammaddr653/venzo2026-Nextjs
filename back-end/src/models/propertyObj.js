//در فاز بعدی توسعه ، با این مدل کار داریم

const mongoose = require("mongoose");
const discountObjSchema = require("./discountObj");

const propertyvalObjSchema = new mongoose.Schema(
  {
    propertyval: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Propertyval",
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

const propertyObjSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
    selective: { type: Boolean, required: true },
    values: [propertyvalObjSchema],
  },
  { _id: false }
);
module.exports = propertyObjSchema;
