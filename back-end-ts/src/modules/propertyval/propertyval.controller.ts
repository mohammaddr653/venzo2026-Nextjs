import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { propertyvalServices } from '#src/services/propertyval.service.js';
import { CreatePropertyvalInput, PropertyvalByIdInput, SeeOnePropertyvalInput, UpdatePropertyvalInput } from './propertyval.schema.js';

export const propertyvalController = {
  async getPropertyvalsById(req: Request<PropertyvalByIdInput['params']>, res: Response) {
    const result = await propertyvalServices.getPropertyvalsById(req.params.propertyId);
    return response({
      res,
      message: 'this is all propertyvals by id',
      data: result.data,
    });
  },

  async seeOnePropertyval(req: Request<SeeOnePropertyvalInput['params']>, res: Response) {
    const result = await propertyvalServices.seeOnePropertyval(req.params.propertyvalId);
    return response({
      res,
      message: 'this is propertyval',
      data: result.data,
    });
  },

  async getPropertyvals(_req: Request, res: Response) {
    const result = await propertyvalServices.getAllPropertyvals();
    return response({
      res,
      message: 'this is all propertyvals',
      data: result.data,
    });
  },

  async createPropertyval(req: Request<{}, {}, CreatePropertyvalInput['body']>, res: Response) {
    const result = await propertyvalServices.createPropertyval(req.body);
    if (result.status === 409)
      return response({
        res,
        message: 'این مقدار ویژگی تکراری است',
        code: result.status,
      });

    if (result.status === 400)
      return response({
        res,
        message: 'ساخت مقدار ویژگی ناموفق بود',
        code: result.status,
      });

    if (result.status === 200)
      return response({
        res,
        message: 'مقدار ویژگی ساخته شد',
      });

    throw new Error('something went wrong');
  },

  async updatePropertyval(req: Request<UpdatePropertyvalInput['params'], {}, UpdatePropertyvalInput['body']>, res: Response) {
    const result = await propertyvalServices.updatePropertyval(req.params.propertyvalId, req.body);

    if (result.status === 200)
      return response({
        res,
        message: 'مقدار ویژگی با موفقیت بروزرسانی شد',
      });

    if (result.status === 400)
      return response({
        res,
        message: 'این مقدار ویژگی تکراری است',
        code: result.status,
      });

    throw new Error('something went wrong');
  },
};
