//controller
const categoriesServices = require("../../services/categoriesServices");
const controller = require("./../controller");

module.exports = new (class extends controller {
  async getCategories(req, res) {
    const result = await categoriesServices.getAllCategories(req, res);
    return this.response({
      res,
      message: "لیست دسته بندی ها",
      data: result.data,
    });
  }
})();
