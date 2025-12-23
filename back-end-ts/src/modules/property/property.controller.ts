import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { CreatePropertyInput, UpdatePropertyInput } from './property.schema.js';
import { propertyServices } from '#src/services/property.service.js';

export const propertyController = {
  async getProperties(_req: Request, res: Response) {
    const result = await propertyServices.getAllProperties();
    return response({
      res,
      message: 'this is all properties',
      data: result.data,
    });
  },
  async createProperty(req: Request<{}, {}, CreatePropertyInput['body']>, res: Response) {
    const result = await propertyServices.createProperty(req.body);
    if (result.status === 400)
      return response({
        res,
        message: 'یک ویژگی با این نام قبلا ساخته شده است',
        code: result.status,
      });

    return response({
      res,
      message: 'ویژگی ساخته شد',
    });
  },

  async updateProperty(req: Request<UpdatePropertyInput['params'], {}, UpdatePropertyInput['body']>, res: Response) {
    const result = await propertyServices.updateProperty(req.params.propertyId, req.body);
    if (result.status === 200)
      return response({
        res,
        message: 'ویژگی با موفقیت بروزرسانی شد',
      });
    if (result.status === 400)
      return response({
        res,
        message: 'نام ویژگی تکراری است',
        code: result.status,
      });

    throw new Error('something went wrong');
  },
};
