const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const orderProduct = require("./orderProduct");
const receiverObjSchema = require("./receiverObj");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: { type: [orderProduct], default: [] },
  status: {
    type: String,
    enum: ["expired", "canceled", "pending", "check", "paid"],
  },
  pendingExpire: { type: Date, default: null }, // انقضای وضعیت pending
  totalPrice: { type: Number, required: true },
  authority: { type: String, default: "" }, //شناسه پرداخت که از زرین پال میگیریم
  authExpire: { type: Date, default: null }, // انقضای authority
  referenceId: { type: String, default: "" }, //شناسه تراکنش که بعد از تایید تراکنش میگیریم
  receiver: { type: receiverObjSchema, required: true },
});
orderSchema.plugin(timestamp);
module.exports = mongoose.model("Order", orderSchema);
