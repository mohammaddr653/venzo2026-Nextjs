require("express-async-errors");
const winston = require("winston");
const debug = require("debug")("app");

module.exports = function () {
  //error handeling for outside the route . after the error caught , application will stop
  process.on("uncaughtException", (ex) => {
    debug("uncaught exception");
    winston.error(ex.message, ex);
    process.exit(1);
  });

  //promise error handeling for outside the route  . after the error caught , application will stop
  process.on("unhandledRejection", (ex) => {
    debug("unhandled rejection");
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
