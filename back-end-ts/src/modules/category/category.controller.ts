import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { CreateCategoryInput, OneCategoryInput, UpdateCategoryInput } from './category.schema.js';
import { categoriesServices } from '#src/services/category.service.js';

export const categoryController = {
  async getCategories(_req: Request, res: Response) {
    const result = await categoriesServices.getAllCategories();
    return response({
      res,
      message: 'لیست دسته بندی ها',
      data: result.data,
    });
  },

  async seeOneCategory(req: Request<OneCategoryInput['params']>, res: Response) {
    const result = await categoriesServices.seeOneCategory(req.params.categoryId);
    return response({
      res,
      message: 'نمایش یک دسته بندی',
      data: result.data,
    });
  },

  async createCategory(req: Request<{}, {}, CreateCategoryInput['body']>, res: Response) {
    const result = await categoriesServices.createCategory(req.body);
    if (result.status === 200)
      return response({
        res,
        message: 'دسته بندی با موفقیت ساخته شد',
        data: result.data,
      });
    if (result.status === 404)
      return response({
        res,
        message: 'ساخت دسته بندی ناموفق بود',
        code: result.status,
      });
    throw new Error('something went wrong');
  },

  async updateCategory(req: Request<UpdateCategoryInput['params'], {}, UpdateCategoryInput['body']>, res: Response) {
    const result = await categoriesServices.updateCategory(req.params.categoryId, req.body);
    if (result.status === 200)
      return response({
        res,
        message: 'دسته بندی با موفقیت بروزرسانی شد',
      });

    if (result.status === 404)
      return response({
        res,
        message: 'بروزرسانی دسته بندی ناموفق بود',
        code: result.status,
      });
    throw new Error('something went wrong');
  },

  async deleteCategory(req: Request<OneCategoryInput['params']>, res: Response) {
    const parentCategoryId = await categoriesServices.deleteCategory(req.params.categoryId); //آیدی کتگوری انتخاب شده را حذف میکنه و آیدی کتگوری بالاتر را برمیگردونه تا محصولات کتگوری حذف شده رو بهش منتقل کنیم
    if (parentCategoryId.status === 200) {
      // note:need to be uncommented
      // await productServices.sendToParentCategory(parentCategoryId.data, req, res);
      // await blogServices.sendToParentCategory(parentCategoryId.data, req, res);
      return response({
        res,
        message: 'دسته بندی با موفقیت حذف شد',
      });
    }
    throw new Error('something went wrong');
  },
};
