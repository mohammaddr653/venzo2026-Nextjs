const mongoose = require("mongoose");
const domPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);
const timestamp = require("mongoose-timestamp");
const propertyObjSchema = require("./propertyObj");
const discountObjSchema = require("./discountObj");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: discountObjSchema, default: null },
  stock: { type: Number, required: true },
  properties: {
    type: [propertyObjSchema],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }, //دسته بندی میتواند خالی باشد ولی محصول هیچ جا نمایش داده نمی شود
  description: { type: String },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
    default: null,
  },
  gallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
});

productSchema.plugin(timestamp);

productSchema.pre("validate", function (next) {
  if (this.description) {
    this.description = htmlPurify.sanitize(this.description);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
