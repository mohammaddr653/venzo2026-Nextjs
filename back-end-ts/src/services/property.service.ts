import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import withTransaction from '#src/helpers/withTransaction.js';
import Property from '#src/models/property.js';
import { CreatePropertyInput, UpdatePropertyInput } from '#src/modules/property/property.schema.js';
import mongoose from 'mongoose';

export const propertyServices = {
  async seeOneProperty(propertyId: string) {
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
};
