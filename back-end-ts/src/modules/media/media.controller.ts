import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { CreateMediaInput } from './media.schema.js';
import { mediaServices } from '#src/services/media.service.js';

export const mediaController = {
  async getMedias(_req: Request, res: Response) {
    const result = await mediaServices.getAllMedias();
    return response({
      res,
      message: 'لیست تمام رسانه ها',
      data: result.data,
    });
  },
  async createMedia(req: Request<{}, {}, CreateMediaInput['body']>, res: Response) {
    const result = await mediaServices.createMedia(req.files! as Express.Multer.File[]);
    return response({
      res,
      message: 'رسانه با موفقیت اضافه شد',
      data: result.data,
    });
  },
};
