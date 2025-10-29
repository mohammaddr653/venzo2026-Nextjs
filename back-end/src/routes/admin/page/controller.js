//controller
const debug = require("debug")("app");
const bannerServices = require("../../../services/bannerServices");
const trustServices = require("../../../services/trustServices");
const controller = require("./../../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async createBanner(req, res) {
    const result = await bannerServices.createBanner(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "بنر با موفقیت اضافه شد",
        data: result.data,
      });

    throw Error;
  }

  async updateBanner(req, res) {
    const result = await bannerServices.updateBanner(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "بنر با موفقیت بروزرسانی شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "بروزرسانی بنر ناموفق بود",
        code: result.status,
      });

    throw Error;
  }

  async deleteBanner(req, res) {
    const result = await bannerServices.deleteBanner(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "بنر با موفقیت حذف شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "حذف بنر ناموفق بود",
        code: result.status,
      });

    throw Error;
  }

  async createTrust(req, res) {
    const result = await trustServices.createTrust(req, res);
    return this.response({
      res,
      message: "اعتماد با موفقیت اضافه شد",
      data: result.data,
    });
  }

  async updateTrust(req, res) {
    const result = await trustServices.updateTrust(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: "اعتماد با موفقیت بروزرسانی شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "بروزرسانی اعتماد ناموفق بود",
        code: result.status,
      });

    throw Error;
  }

  async deleteTrust(req, res) {
    const result = await trustServices.deleteTrust(req, res);
    
    if (result.status === 200)
      return this.response({
        res,
        message: "اعتماد با موفقیت حذف شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "حذف اعتماد ناموفق بود",
        code: result.status,
      });

    throw Error;
  }
})();
