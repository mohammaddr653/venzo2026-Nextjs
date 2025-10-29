//controller
const debug = require("debug")("app");
const Property = require("../../models/property");
const categoriesServices = require("../../services/categoriesServices");
const productServices = require("../../services/productServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getSingleShop(req, res) {
    const result = await productServices.seeOneProduct(req, res);
    return this.response({
      res,
      message: "this is single shop",
      data: result.data,
    });
  }
  async getSingleShopWithProperties(req, res) {
    const { data: allCategories } = await categoriesServices.getAllCategories(
      req,
      res
    ); //تمام دسته بندی ها

    const { data: product } = await productServices.getSingleShopWithProperties(
      req,
      res
    );

    const { data: motherCategories } = await categoriesServices.motherCats(
      req,
      res,
      allCategories,
      product?.categoryId
    ); //دریافت آرایه motherCategories
    return this.response({
      res,
      message: "this is single shop with properties",
      data: {
        product: product,
        motherCategories: motherCategories,
      },
    });
  }
})();
