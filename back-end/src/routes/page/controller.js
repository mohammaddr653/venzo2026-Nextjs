//controller
const debug = require("debug")("app");
const bannerServices = require("../../services/bannerServices");
const trustServices = require("../../services/trustServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getBanners(req, res) {
    const result = await bannerServices.getAllBanners(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "لیست تمام بنر ها",
        data: result.data,
      });
    throw Error;
  }

  async getTrusts(req, res) {
    const result = await trustServices.getAllTrusts(req, res);
    return this.response({
      res,
      message: "لیست تمام اعتماد ها",
      data: result.data,
    });
  }
})();
