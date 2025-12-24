import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Property from '#src/models/property.js';
import Propertyval from '#src/models/propertyval.js';
import { CreatePropertyvalInput } from '#src/modules/propertyval/propertyval.schema.js';
import mongoose from 'mongoose';

export const propertyvalServices = {
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
};
