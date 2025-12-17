import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Category from '#src/models/category.js';
import { CreateCategoryInput, UpdateCategoryInput } from '#src/modules/category/category.schema.js';
import { ICategoryDocument } from '#src/types/category.types.js';
import mongoose from 'mongoose';

export const categoriesServices = {
  async getAllCategories(): Promise<ServiceResponse> {
    //خواندن تمام دسته بندی ها از دیتابیس
    const findOp = await Category.find({}).populate('img');
    return serviceResponse(200, findOp);
  },

  async seeOneCategory(categoryId: string): Promise<ServiceResponse> {
    // خواندن یک دسته بندی از دیتابیس
    const findOp = await Category.findById(categoryId).populate('img');
    return serviceResponse(200, findOp);
  },

  async createCategory(data: CreateCategoryInput['body']): Promise<ServiceResponse> {
    //اضافه کردن دسته بندی
    const newCategory = new Category({
      name: data.name,
      type: data.type,
      link: data.link,
      img: data.img === '' ? null : data.img,
      display: data.display,
    });
    if (data.motherId) {
      const exist = await Category.findById(data.motherId);
      if (!exist) return serviceResponse(404, {});
      newCategory.motherId = new mongoose.Types.ObjectId(data.motherId);
    }
    const saveOp = await newCategory.save();
    return serviceResponse(200, saveOp);
  },

  async updateCategory(categoryId: string, data: UpdateCategoryInput['body']): Promise<ServiceResponse> {
    const { data: category } = await this.seeOneCategory(categoryId);
    if (category) {
      category.name = data.name;
      category.motherId = data.motherId === 'root' ? 'root' : new mongoose.Types.ObjectId(data.motherId);
      category.type = data.type;
      category.link = data.link;
      category.img = data.img === '' ? null : data.img;
      category.display = data.display;

      if (data.motherId !== category.id) {
        if (data.motherId !== 'root') {
          const exist = await Category.findById(data.motherId);
          if (!exist) return serviceResponse(404, {});
        }
        await category.save();
        return serviceResponse(200, {});
      } else {
        return serviceResponse(403, {});
      }
    }
    return serviceResponse(404, {});
  },

  async deleteCategory(categoryId: string): Promise<ServiceResponse> {
    //حذف دسته بندی . آیدی را میگیرد ، دسته بندی را حذف میکند و فرزندان آن را به دسته بندی مادر بالاتر منتقل می کند
    let parentCategoryId;
    const deleteOp = await Category.findOneAndDelete({
      _id: categoryId,
    });
    if (deleteOp) {
      parentCategoryId = deleteOp.motherId;
      await Category.updateMany({ motherId: deleteOp._id }, { $set: { motherId: deleteOp.motherId } });
      return serviceResponse(200, parentCategoryId);
    }
    return serviceResponse(404, {});
  },

  async childCats(categories: ICategoryDocument[], initialId: mongoose.Types.ObjectId) {
    const childCategories: ICategoryDocument[] = [];
    if (categories) {
      const loop = (array: ICategoryDocument[], id: mongoose.Types.ObjectId) => {
        if (id) {
          const sId = id.toString();
          const category = categories.find((item) => item.id === sId);
          category ? childCategories.push(category) : null;

          array.forEach((obj) => {
            if (obj.motherId.toString() === sId) {
              loop(categories, obj._id);
            }
          });
        }
      };
      loop(categories, initialId);
    }
    return serviceResponse(200, childCategories);
  },

  async motherCats(categories: ICategoryDocument[], initialId: mongoose.Types.ObjectId) {
    const motherCategories: ICategoryDocument[] = [];
    if (categories) {
      const loop = (array: ICategoryDocument[], id: mongoose.Types.ObjectId) => {
        if (id) {
          const sId = id.toString();
          const category = categories.find((item) => item.id === sId);
          category ? motherCategories.push(category) : null;
          if (category?.motherId !== 'root') {
            loop(array, category?.motherId as mongoose.Types.ObjectId);
          }
        }
      };
      loop(categories, initialId);
    }
    return serviceResponse(200, motherCategories);
  },

  //یک آرایه متشکل از کتگوری کلیک شده و تمام کتگوری های فرزندش
  async createCategoryArr(categories: ICategoryDocument[]): Promise<ServiceResponse> {
    let categoryArr: mongoose.Types.ObjectId[] = [];
    if (categories) {
      categories.forEach((obj) => {
        categoryArr.push(obj._id);
      });
    }
    return serviceResponse(200, categoryArr);
  },
};
