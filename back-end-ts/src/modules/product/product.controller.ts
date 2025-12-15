import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { CreateProductInput } from './product.schema.js';
import { productServices } from '#src/services/product.service.js';

export const productController = {
  async createProduct(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {
    const result = await productServices.createProduct(req.body);
    return response({
      res,
      message: 'محصول با موفقیت ساخته شد',
      data: result.data,
    });
  },
};
