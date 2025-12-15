import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Product from '#src/models/product.js';
import { CreateProductInput } from '#src/modules/product/product.schema.js';
import mongoose from 'mongoose';

export const productServices = {
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
