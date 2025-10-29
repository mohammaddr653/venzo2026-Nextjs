//controller
const debug = require("debug")("app");
const cartServices = require("../../services/cartServices");
const orderServices = require("../../services/orderServices");
const productServices = require("../../services/productServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getOrders(req, res) {
    const result = await orderServices.getUserOrders(req, res);
    return this.response({
      res,
      message: "لسیست تمام سفارشات کاربر",
      data: result.data,
    });
  }

  async getOneOrder(req, res) {
    const result = await orderServices.seeOneOrder(req, res);
    return this.response({
      res,
      message: "خواندن یک سفارش",
      data: result.data,
    });
  }

  async createOrderFromCart(req, res) {
    const { data: cart } = await cartServices.seeOneCart(req, res);
    const result = await orderServices.newOrderFromCart(req, res, cart);
    return this.response({
      res,
      message: "new order created , here is the order id",
      data: result.data._id,
    });
  }
})();
