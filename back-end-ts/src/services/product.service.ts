import filterConditionsQuery from '#src/helpers/queries/filterConditionsQuery.js';
import filtersAggregation from '#src/helpers/queries/filtersAggregation.js';
import shopAggregation from '#src/helpers/queries/shopAggregation.js';
import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Product from '#src/models/product.js';
import { CreateProductInput, UpdateProductInput } from '#src/modules/product/product.schema.js';
import { PropertyObj } from '#src/types/property.types.js';
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

  async seeOneProduct(productId: string) {
    // خواندن یک محصول از دیتابیس
    const findOp = await Product.findById(productId)
      .populate('img')
      .populate('gallery')
      .populate({ path: 'properties.property', model: 'Property' })
      .populate({
        path: 'properties.values.propertyval',
        model: 'Propertyval',
      });

    return serviceResponse(200, findOp);
  },

  //note:this function must combine with seeOneProduct function since both do the same job
  async getSingleShopWithProperties(productId: string): Promise<ServiceResponse> {
    const { data: product } = await this.seeOneProduct(productId);
    return serviceResponse(200, product);
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

  async getFiltersByCategoryString(categoryArr: mongoose.Types.ObjectId[]): Promise<ServiceResponse> {
    //خواندن فیلتر ها مطابق با دسته بندی
    const filters = await Product.aggregate(filtersAggregation(categoryArr));
    return serviceResponse(200, filters);
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

  async updateProduct(productId: string, data: UpdateProductInput['body']) {
    let product = await Product.findById(productId);
    if (product) {
      product.name = data.name;
      product.price = data.price;
      product.discount = data.discount;
      product.stock = data.stock;
      product.categoryId = data.categoryId === '' ? null : product.categoryId;
      product.description = data.description;
      product.properties = data.properties as unknown as PropertyObj[];
      product.img = data.img as unknown as mongoose.Types.ObjectId;
      product.gallery = data.gallery as unknown as mongoose.Types.ObjectId[];

      if (data.categoryId) {
        product.categoryId = new mongoose.Types.ObjectId(data.categoryId);
      }
      await product.save();
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  },
};
