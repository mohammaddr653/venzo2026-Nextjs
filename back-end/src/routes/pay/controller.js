//controller
const debug = require("debug")("app");
const payServices = require("../../services/payServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async postPay(req, res) {
    const result = await payServices.postPay(req, res);
    if (result.status === 200) {
      return this.response({
        res,
        message: "در حال انتقال به درگاه پرداخت...",
        data: result.data,
      });
    }
    if (result.status === 409) {
      return this.response({
        res,
        message: "این سفارش منقضی شده یا قبلا پرداخت شده است",
        code: result.status,
      });
    }
    if (result.status === 500) {
      return this.response({
        res,
        message: "انتقال به درگاه پرداخت ناموفق بود . لطفا دوباره امتحان کنید",
        code: result.status,
      });
    }

    throw new Error("unknow error happend");
  }

  async callback(req, res) {
    const result = await payServices.verifyPayment(req, res);
    return res.redirect(
      process.env.ORIGIN_URL +
        `/callback/?code=${result.status}&data=${
          result.status === 200 ? result.data : undefined
        }`
    );
  }

  async manualVerify(req, res) {
    //تایید تراکنش بصورت دستی
    const result = await payServices.verifyPayment(req, res);
    if (result.status === 200) {
      return this.response({
        res,
        message: "تراکنش تایید شد .",
      });
    }
    if (result.status === 101) {
      return this.response({
        res,
        message: "تراکنش قبلا تایید شده",
      });
    }
    if (result.status === 401) {
      return this.response({
        res,
        message: "تراکنش تایید نشد",
        code: result.status,
      });
    }
    if (result.status === 500) {
      return this.response({
        res,
        message: "امکان تایید تراکنش وجود نداشت .",
        code: result.status,
      });
    }

    throw new Error("unknow error happend");
  }

  async inquiry(req, res) {
    //استعلام تراکنش
    const result = await payServices.inquireTransaction(req, res);
    if (result.status === 200) {
      return this.response({
        res,
        message: `نتیجه استعلام : ${JSON.stringify(result.data)}`,
      });
    }
    if (result.status === 500) {
      return this.response({
        res,
        message: "استعلام ناموفق",
        code: result.status,
      });
    }

    throw new Error("unknow error happend");
  }
})();
