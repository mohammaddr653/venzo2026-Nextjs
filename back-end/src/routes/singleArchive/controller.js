//controller
const debug = require("debug")("app");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getSingleArchive(req, res) {
    return this.response({
      res,
      message: "this is single archive",
    });
  }
})();
