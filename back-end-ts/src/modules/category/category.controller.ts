import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { CreateCategoryInput } from './category.schema.js';
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
};
