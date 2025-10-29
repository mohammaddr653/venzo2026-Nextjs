const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const reservedProduct = require("./reservedProduct");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reservedProducts: { type: [reservedProduct], default: [] },
});
cartSchema.plugin(timestamp);
module.exports = mongoose.model("Cart", cartSchema);
