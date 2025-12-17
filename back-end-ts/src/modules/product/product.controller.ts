import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import {
  CreateProductInput,
  GetFiltersInput,
  GetMostProductsInput,
  GetProductsByCategoryInput,
  GetSingleProductInput,
} from './product.schema.js';
import { productServices } from '#src/services/product.service.js';
import { categoriesServices } from '#src/services/category.service.js';
import mongoose from 'mongoose';

export const productController = {
  async getProducts(_req: Request, res: Response) {
    const result = await productServices.getAllProducts();
    return response({
      res,
      message: 'لیست تمام محصولات',
      data: result.data,
    });
  },

  async getSingleShopWithProperties(req: Request<GetSingleProductInput['params']>, res: Response) {
    const { data: allCategories } = await categoriesServices.getAllCategories(); //تمام دسته بندی ها

    const { data: product } = await productServices.getSingleShopWithProperties(req.params.productId);

    const { data: motherCategories } = await categoriesServices.motherCats(allCategories, product?.categoryId); //دریافت آرایه motherCategories
    return response({
      res,
      message: 'this is single shop with properties',
      data: {
        product: product,
        motherCategories: motherCategories,
      },
    });
  },

  async getMostProducts(req: Request<{}, {}, {}, GetMostProductsInput['query']>, res: Response) {
    if (req.query.type === 'newest') {
      const result = await productServices.getNewestProducts();
      return response({
        res,
        message: 'لیست جدیدترین محصولات',
        data: result.data,
      });
    }
    if (req.query.type === 'offers') {
      const result = await productServices.getOfferProducts();
      return response({
        res,
        message: 'لیست محصولات تخفیف دار',
        data: result.data,
      });
    }

    throw Error;
  },

  async getShopByCategory(req: Request<GetProductsByCategoryInput['params'], {}, {}, GetProductsByCategoryInput['query']>, res: Response) {
    const { data: allCategories } = await categoriesServices.getAllCategories(); //تمام دسته بندی ها
    const { data: childCategories } = await categoriesServices.childCats(
      allCategories,
      req.params.categoryString as unknown as mongoose.Types.ObjectId,
    ); //دریافت آرایه childCats

    const { data: categoryArr } = await categoriesServices.createCategoryArr(childCategories); //آرایه دسته بندی تولید میشه که شامل دسته بندی انتخاب شده و زیرمجموعه های آن است
    const { data: products } = await productServices.getProductsByCategoryString(
      categoryArr,
      req.query.limit,
      req.query.page,
      req.query.attributes,
    ); //دریافت محصولات مطابق با آرایه دسته بندی

    const { data: totalCount } = await productServices.getTotalCount(categoryArr, req.query.attributes); //دریافت تعداد کل محصولات مطابق با آرایه دسته بندی

    const { data: motherCategories } = await categoriesServices.motherCats(
      allCategories,
      req.params.categoryString as unknown as mongoose.Types.ObjectId,
    ); //دریافت آرایه motherCategories

    return response({
      res,
      message: 'this is shop , products of specific category',
      data: {
        products: products,
        totalCount: totalCount,
        motherCategories: motherCategories,
        childCategories: childCategories,
      },
    });
  },

  async getFiltersByCategory(req: Request<GetFiltersInput['params']>, res: Response) {
    const { data: allCategories } = await categoriesServices.getAllCategories(); //تمام دسته بندی ها
    const { data: childCategories } = await categoriesServices.childCats(
      allCategories,
      req.params.categoryString as unknown as mongoose.Types.ObjectId,
    ); //دریافت آرایه childCats

    const { data: categoryArr } = await categoriesServices.createCategoryArr(childCategories); //آرایه دسته بندی تولید میشه که شامل دسته بندی انتخاب شده و زیرمجموعه های آن است

    const { data: filters } = await productServices.getFiltersByCategoryString(categoryArr); //فیلتر ها

    return response({
      res,
      message: 'this is filters , of specific category',
      data: filters,
    });
  },

  async createProduct(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {
    const result = await productServices.createProduct(req.body);
    return response({
      res,
      message: 'محصول با موفقیت ساخته شد',
      data: result.data,
    });
  },
};
