const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const propertyvalSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  value: { type: String, required: true, trim: true },
  hex: {
    type: String,
    trim: true,
  },
});
propertyvalSchema.plugin(timestamp);
module.exports = mongoose.model("Propertyval", propertyvalSchema);
