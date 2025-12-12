import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Category from '#src/models/category.js';
import { CreateCategoryInput } from '#src/modules/category/category.schema.js';
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
};
