const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const urlsObjSchema = require("./urlsObj");

const mediaSchema = new mongoose.Schema({
  urls: { type: urlsObjSchema, required: true },
});

mediaSchema.plugin(timestamp);

module.exports = mongoose.model("Media", mediaSchema);
