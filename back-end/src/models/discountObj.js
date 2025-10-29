const mongoose = require("mongoose");

const discountObjSchema = new mongoose.Schema(
  {
    offer: {
      type: Number,
      required: true,
      min: 0,
    },
    startedAt: { type: Date, default: null }, //فعلا استفاده نشده
    expiredAt: { type: Date, default: null }, //فعلا استفاده نشده
  },
  { _id: false }
);
module.exports = discountObjSchema;
