import filterConditionsQuery from '#src/helpers/queries/filterConditionsQuery.js';
import shopAggregation from '#src/helpers/queries/shopAggregation.js';
import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Product from '#src/models/product.js';
import { CreateProductInput } from '#src/modules/product/product.schema.js';
import mongoose from 'mongoose';

export const productServices = {
  async getAllProducts(): Promise<ServiceResponse> {
    //خواندن تمام محصولات از دیتابیس
    const findOp = await Product.find({}).populate('img').populate({ path: 'properties.property', model: 'Property' }).populate({
      path: 'properties.values.propertyval',
      model: 'Propertyval',
    });
    return serviceResponse(200, findOp);
  },

  async getNewestProducts(): Promise<ServiceResponse> {
    //خواندن جدیدترین محصولات از دیتابیس
    const findOp = await Product.find({})
      .sort({ updatedAt: -1 })
      .limit(15)
      .populate('img')
      .populate({ path: 'properties.property', model: 'Property' })
      .populate({
        path: 'properties.values.propertyval',
        model: 'Propertyval',
      });

    return serviceResponse(200, findOp);
  },

  //note: این کوئری میتونه بعدا سنگین بشه . با اضافه کردن flag این مشکل رو حل کن
  async getOfferProducts(): Promise<ServiceResponse> {
    //خواندن محصولات تخفیف دار از دیتابیس
    const findOp = await Product.find({
      $or: [
        {
          // شرط 1: property با selective: true و حداقل یک value با discount ≠ null
          properties: {
            $elemMatch: {
              selective: true,
              values: {
                $elemMatch: {
                  discount: { $ne: null },
                },
              },
            },
          },
        },
        {
          // شرط 2: هیچ property با selective: true وجود ندارد و خود محصول discount دارد
          $and: [{ properties: { $not: { $elemMatch: { selective: true } } } }, { discount: { $ne: null } }],
        },
      ],
    })
      .sort({ updatedAt: -1 })
      .limit(15)
      .populate('img')
      .populate({ path: 'properties.property', model: 'Property' })
      .populate({
        path: 'properties.values.propertyval',
        model: 'Propertyval',
      });

    return serviceResponse(200, findOp);
  },

  async getProductsByCategoryString(
    categoryArr: mongoose.Types.ObjectId[],
    limit: string | undefined,
    page: string | undefined,
    attributes: any,
  ): Promise<ServiceResponse> {
    //خواندن محصولات مخصوص دسته بندی انتخاب شده از دیتابیس
    const lim = parseInt(limit!) || 2;
    const pg = parseInt(page!) - 1 || 0;
    const skip = pg * lim;
    const filterConditions = filterConditionsQuery(attributes);
    const result = await Product.aggregate(shopAggregation(categoryArr, filterConditions, skip, lim));
    let products = result[0].products;
    return serviceResponse(200, products);
  },

  async getTotalCount(categoryArr: mongoose.Types.ObjectId[], attributes: any): Promise<ServiceResponse> {
    //تعداد محصولات مطابق با دسته بندی و فیلتر ها
    const filterConditions = filterConditionsQuery(attributes);
    const totalCount = await Product.find({
      categoryId: { $in: categoryArr },
      ...(filterConditions.length > 0 ? { $and: filterConditions } : {}),
    }).countDocuments();
    return serviceResponse(200, totalCount);
  },

  async createProduct(data: CreateProductInput['body']): Promise<ServiceResponse> {
    //اضافه کردن محصول
    const newProduct = new Product({
      name: data.name,
      price: data.price,
      discount: data.discount,
      stock: data.stock,
      description: data.description,
      properties: data.properties,
      img: data.img,
      gallery: data.gallery,
    });
    if (data.categoryId) {
      newProduct.categoryId = new mongoose.Types.ObjectId(data.categoryId);
    }
    const saveOp = await newProduct.save();
    return serviceResponse(200, saveOp);
  },
};
