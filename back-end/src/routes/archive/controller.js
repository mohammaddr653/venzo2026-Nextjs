//controller
const debug = require("debug")("app");
const blogServices = require("../../services/blogServices");
const categoriesServices = require("../../services/categoriesServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  //note: this function needs to be fixed maybe
  async getArchive(req, res) {
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
    const result = await blogServices.getBlogsByCategoryString(
      categoryArr,
      req,
      res
    ); //دریافت مقالات مطابق با آرایه دسته بندی
    return this.response({
      res,
      message: "this is archive, blogs of specific category",
      data: result.data,
    });
  }
})();
