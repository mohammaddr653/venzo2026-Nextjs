//controller
const debug = require("debug")("app");
const userServices = require("../../services/userServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    return this.response({
      res,
      message: "this is user dashboard",
      data: _.pick(req.user, ["name", "email", "isadmin"]),
    });
  }

  async updateProfile(req, res) {
    const result = await userServices.updateProfile(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: " اکانت شما با موفقیت بروزرسانی شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        code: result.status,
        message: "خطا در بروزرسانی",
      });

    throw Error;
  }

  async addAvatar(req, res) {
    const result = await userServices.addAvatar(req, res);
    if (result.status === 200)
      return this.response({
        res,
        message: "آواتار با موفقیت اضافه شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "کاربر یافت نشد",
        code: result.status,
      });

    throw Error;
  }

  async deleteAvatar(req, res) {
    const result = await userServices.deleteAvatar(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: "آواتار با موفقیت حذف شد",
      });

    if (result.status === 404)
      return this.response({
        res,
        message: "کاربر یافت نشد",
        code: result.status,
      });

    throw Error;
  }
})();
