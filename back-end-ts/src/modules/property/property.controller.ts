import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { CreatePropertyInput } from './property.schema.js';
import { propertyServices } from '#src/services/property.service.js';

export const propertyController = {
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
};
