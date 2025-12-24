import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import withTransaction from '#src/helpers/withTransaction.js';
import Property from '#src/models/property.js';
import Propertyval from '#src/models/propertyval.js';
import { CreatePropertyvalInput, UpdatePropertyvalInput } from '#src/modules/propertyval/propertyval.schema.js';
import mongoose from 'mongoose';

export const propertyvalServices = {
  async getAllPropertyvals(): Promise<ServiceResponse> {
    //reading all propertyvals
    const findOp = await Propertyval.find({});
    return serviceResponse(200, findOp);
  },

  async seeOnePropertyval(propertyvalId: string): Promise<ServiceResponse> {
    // reading one propertyval from database
    const findOp = await Propertyval.findById(propertyvalId);
    return serviceResponse(200, findOp);
  },

  async getPropertyvalsById(propertyId: string): Promise<ServiceResponse> {
    //reading all propertyvals by id
    const findOp = await Propertyval.find({
      propertyId: propertyId,
    });
    return serviceResponse(200, findOp);
  },

  async createPropertyval(data: CreatePropertyvalInput['body']): Promise<ServiceResponse> {
    // create propertyval
    const repeatedValue = await Propertyval.findOne({
      propertyId: data.propertyId,
      value: data.value,
    });
    if (repeatedValue) return serviceResponse(409, {});

    const propertyval = new Propertyval({
      value: data.value,
    });
    const exist = await Property.findById(data.propertyId);
    if (!exist) return serviceResponse(400, {});
    if (exist.type === 'color') {
      if (!data.hex) return serviceResponse(400, {});
      propertyval.hex = data.hex;
    }
    propertyval.propertyId = new mongoose.Types.ObjectId(data.propertyId);
    await propertyval.save();
    return serviceResponse(200, {});
  },

  async updatePropertyval(propertyvalId: string, data: UpdatePropertyvalInput['body']) {
    const { data: propertyval } = await this.seeOnePropertyval(propertyvalId);
    let repeatedPropertyval = await Propertyval.findOne({
      propertyId: propertyval.propertyId,
      value: data.value,
    });
    if (repeatedPropertyval && propertyval.value !== data.value) {
      return serviceResponse(400, {});
    }
    propertyval.value = data.value;
    //note:I think we can do this without transactions
    const transactionResult = await withTransaction(async (session: mongoose.mongo.ClientSession) => {
      await propertyval.save({ session });
      return serviceResponse(200, {});
    });
    return transactionResult;
  },
};
