//controller
const debug = require("debug")("app");
const categoriesServices = require("../../services/categoriesServices");
const productServices = require("../../services/productServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getProducts(req, res) {
    const result = await productServices.getAllProducts(req, res);
    return this.response({
      res,
      message: "لیست تمام محصولات",
      data: result.data,
    });
  }

  async getMostProducts(req, res) {
    if (req.query.type === "newest") {
      const result = await productServices.getNewestProducts(req, res);
      return this.response({
        res,
        message: "لیست جدیدترین محصولات",
        data: result.data,
      });
    }
    if (req.query.type === "offers") {
      const result = await productServices.getOfferProducts(req, res);
      return this.response({
        res,
        message: "لیست محصولات تخفیف دار",
        data: result.data,
      });
    }

    throw Error;
  }

  async getFiltersByCategory(req, res) {
    const { data: allCategories } = await categoriesServices.getAllCategories(
      req,
      res
    ); //تمام دسته بندی ها
    const { data: childCategories } = await categoriesServices.childCats(
      req,
      res,
      allCategories,
      req.params.categoryString
    ); //دریافت آرایه childCats

    const { data: categoryArr } = await categoriesServices.createCategoryArr(
      req,
      res,
      childCategories
    ); //آرایه دسته بندی تولید میشه که شامل دسته بندی انتخاب شده و زیرمجموعه های آن است

    const { data: filters } = await productServices.getFiltersByCategoryString(
      categoryArr,
      req,
      res
    ); //فیلتر ها

    return this.response({
      res,
      message: "this is filters , of specific category",
      data: filters,
    });
  }

  async getShopByCategory(req, res) {
    const { data: allCategories } = await categoriesServices.getAllCategories(
      req,
      res
    ); //تمام دسته بندی ها
    const { data: childCategories } = await categoriesServices.childCats(
      req,
      res,
      allCategories,
      req.params.categoryString
    ); //دریافت آرایه childCats

    const { data: categoryArr } = await categoriesServices.createCategoryArr(
      req,
      res,
      childCategories
    ); //آرایه دسته بندی تولید میشه که شامل دسته بندی انتخاب شده و زیرمجموعه های آن است
    const { data: products } =
      await productServices.getProductsByCategoryString(categoryArr, req, res); //دریافت محصولات مطابق با آرایه دسته بندی

    const { data: totalCount } = await productServices.getTotalCount(
      categoryArr,
      req,
      res
    ); //دریافت تعداد کل محصولات مطابق با آرایه دسته بندی

    const { data: motherCategories } = await categoriesServices.motherCats(
      req,
      res,
      allCategories,
      req.params.categoryString
    ); //دریافت آرایه motherCategories

    return this.response({
      res,
      message: "this is shop , products of specific category",
      data: {
        products: products,
        totalCount: totalCount,
        motherCategories: motherCategories,
        childCategories: childCategories,
      },
    });
  }
})();
