const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const trustSchema = new mongoose.Schema({
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Media", default: null },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  show: { type: Boolean, required: true, default: false },
});

trustSchema.plugin(timestamp);

module.exports = mongoose.model("Trust", trustSchema);
