const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const urlsObjSchema = require("./urlsObj");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: new mongoose.Schema(
      {
        urls: { type: urlsObjSchema, required: true },
      },
      { _id: false }
    ),
    default: null,
  },
  isadmin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  passwordResetToken: { type: String, default: null },
  passwordResetTokenExpires: { type: Date, default: null },
});
userSchema.plugin(timestamp);

module.exports = mongoose.model("User", userSchema);
