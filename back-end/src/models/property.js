const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  specifiedVals: { type: Boolean, required: true, default: true },
  type: {
    type: String,
    enum: ["ordinary", "color"],
    required: true,
    default: "ordinary",
  },
});
propertySchema.plugin(timestamp);
module.exports = mongoose.model("Property", propertySchema);
