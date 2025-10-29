const debug = require("debug")("app");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => debug("connected to mongodb"))
    .catch(() => debug("could not connect"));
};
