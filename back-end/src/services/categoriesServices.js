const mongoose = require("mongoose");
const Category = require("../models/category");
const serviceResponse = require("../helpers/serviceResponse");

class CategoriesServices {
  async getAllCategories(req, res) {
    //خواندن تمام دسته بندی ها از دیتابیس
    const findOp = await Category.find({}).populate("img");
    return serviceResponse(200, findOp);
  }
  async seeOneCategory(req, res) {
    // خواندن یک دسته بندی از دیتابیس
    const findOp = await Category.findById(req.params.categoryId).populate(
      "img"
    );
    return serviceResponse(200, findOp);
  }

  async createCategory(req, res) {
    //اضافه کردن دسته بندی
    const newCategory = new Category({
      name: req.body.name,
      type: req.body.type,
      link: req.body.link,
      img: req.body.img === "" ? null : req.body.img,
      display: req.body.display,
    });
    if (req.body.motherId) {
      const exist = await Category.findById(req.body.motherId);
      if (!exist) return serviceResponse(404, {});
      newCategory.motherId = new mongoose.Types.ObjectId(req.body.motherId);
    }
    const saveOp = await newCategory.save();
    return serviceResponse(200, saveOp);
  }

  async motherCats(req, res, categories, initialId) {
    const motherCategories = [];
    if (categories) {
      const loop = (array, id) => {
        if (id) {
          id = id.toString();
          const category = categories.find((item) => item.id === id);
          motherCategories.push(category);
          if (category.motherId !== "root") {
            loop(array, category.motherId.toString());
          }
        }
      };
      loop(categories, initialId);
    }
    return serviceResponse(200, motherCategories);
  }

  async childCats(req, res, categories, initialId) {
    const childCategories = [];
    if (categories) {
      const loop = (array, id) => {
        if (id) {
          id = id.toString();
          const category = categories.find((item) => item.id === id);
          childCategories.push(category);

          array.forEach((obj) => {
            if (obj.motherId.toString() === id) {
              loop(categories, obj._id);
            }
          });
        }
      };
      loop(categories, initialId);
    }
    return serviceResponse(200, childCategories);
  }

  //بروزرسانی دسته بندی
  async updateCategory(req, res) {
    const { data: category } = await this.seeOneCategory(req, res);
    if (category) {
      category.name = req.body.name;
      category.motherId =
        req.body.motherId === "root"
          ? "root"
          : new mongoose.Types.ObjectId(req.body.motherId);
      category.type = req.body.type;
      category.link = req.body.link;
      category.img = req.body.img === "" ? null : req.body.img;
      category.display = req.body.display;

      if (req.body.motherId !== category.id) {
        if (req.body.motherId !== "root") {
          const exist = await Category.findById(req.body.motherId);
          if (!exist) return serviceResponse(404, {});
        }
        await category.save();
        return serviceResponse(200, {});
      } else {
        return serviceResponse(403, {});
      }
    }
    return serviceResponse(404, {});
  }

  async deleteCategory(req, res) {
    //حذف دسته بندی . آیدی را میگیرد ، دسته بندی را حذف میکند و فرزندان آن را به دسته بندی مادر بالاتر منتقل می کند
    let parentCategoryId;
    const deleteOp = await Category.findOneAndDelete({
      _id: req.params.categoryId,
    });
    if (deleteOp) {
      parentCategoryId = deleteOp.motherId;
      await Category.updateMany(
        { motherId: deleteOp._id },
        { $set: { motherId: deleteOp.motherId } }
      );
      return serviceResponse(200, parentCategoryId);
    }
    return serviceResponse(404, {});
  }

  //یک آرایه متشکل از کتگوری کلیک شده و تمام کتگوری های فرزندش
  async createCategoryArr(req, res, categories) {
    let categoryArr = [];
    if (categories) {
      categories.forEach((obj) => {
        categoryArr.push(obj._id);
      });
    }
    return serviceResponse(200, categoryArr);
  }
}
module.exports = new CategoriesServices();
