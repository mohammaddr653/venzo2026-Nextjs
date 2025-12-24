import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import withTransaction from '#src/helpers/withTransaction.js';
import Product from '#src/models/product.js';
import Property from '#src/models/property.js';
import Propertyval from '#src/models/propertyval.js';
import { CreatePropertyInput, UpdatePropertyInput } from '#src/modules/property/property.schema.js';
import mongoose from 'mongoose';

export const propertyServices = {
  async getAllProperties(): Promise<ServiceResponse> {
    //reading all properties
    const findOp = await Property.find({});
    return serviceResponse(200, findOp);
  },

  //note:maybe I can do this with aggregation
  async getPropertiesWithVals(): Promise<ServiceResponse> {
    //reading all properties with values
    const result = [];
    const properties = await Property.find({});
    for (const property of properties) {
      const data = {
        _id: property._id,
        name: property.name,
        specifiedVals: property.specifiedVals,
        type: property.type,
        values: [],
      };
      data.values = await Propertyval.find({ propertyId: property._id }, { _id: 1, value: 1, hex: 1 });
      result.push(data);
    }
    return serviceResponse(200, result);
  },

  async seeOneProperty(propertyId: string): Promise<ServiceResponse> {
    // reading one property from database
    const findOp = await Property.findById(propertyId);
    return serviceResponse(200, findOp);
  },

  async createProperty(data: CreatePropertyInput['body']): Promise<ServiceResponse> {
    // create property
    let property = await Property.findOne({ name: data.name });
    if (property) {
      return serviceResponse(400, {});
    }
    property = new Property({
      name: data.name,
      specifiedVals: data.specifiedVals,
      type: data.type,
    });
    await property.save();
    return serviceResponse(200, {});
  },

  async updateProperty(propertyId: string, data: UpdatePropertyInput['body']) {
    //if you changed the name field , it checks if its exists or not , then it updates the property
    const { data: property } = await this.seeOneProperty(propertyId);
    let repeatedProperty = await Property.findOne({ name: data.name });
    if (repeatedProperty && property.name !== data.name) {
      return serviceResponse(400, {});
    }
    property.name = data.name;

    const transactionResult = await withTransaction(async (session: mongoose.mongo.ClientSession) => {
      await property.save({ session });
      return serviceResponse(200, {});
    });
    return transactionResult;
  },

  //checks if this property is not used in any product then allow it to delete
  async deleteProperty(propertyId: string) {
    const { data: property } = await this.seeOneProperty(propertyId);
    let productsInUse = await Product.find(
      {
        properties: { $elemMatch: { name: property._id } },
      },
      { name: 1, _id: 0 },
    );
    if (productsInUse && productsInUse.length) {
      const productsName = await Promise.all(
        productsInUse.map((item) => {
          return item.name;
        }),
      );
      return serviceResponse(403, productsName);
    }

    const transactionResult = await withTransaction(async (session: mongoose.mongo.ClientSession) => {
      const deleteOp = await Property.deleteOne({ _id: propertyId }, { session });
      if (deleteOp.deletedCount > 0) {
        await Propertyval.deleteMany({ propertyId: propertyId }, { session });
        return serviceResponse(200, {});
      }
      return serviceResponse(404, {});
    });
    return transactionResult;
  },
};
