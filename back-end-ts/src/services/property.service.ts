import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Property from '#src/models/property.js';
import { CreatePropertyInput } from '#src/modules/property/property.schema.js';

export const propertyServices = {
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
};
