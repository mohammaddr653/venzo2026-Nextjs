const mongoose = require("mongoose");

const receiverObjSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    note: {  //یادداشت
      type: String,
    },
  },
  { _id: false }
);
module.exports = receiverObjSchema;
