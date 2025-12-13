import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { CreateMediaInput, OneMediaInput, UpdateMediaInput } from './media.schema.js';
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

  async seeOneMedia(req: Request<OneMediaInput['params']>, res: Response) {
    const result = await mediaServices.seeOneMedia(req.params.mediaId);
    return response({
      res,
      message: 'this is media',
      data: result.data,
    });
  },
  async createMedia(req: Request<{}, {}, CreateMediaInput['body']>, res: Response) {
    const result = await mediaServices.createMedia(req.files as Express.Multer.File[]);
    return response({
      res,
      message: 'رسانه با موفقیت اضافه شد',
      data: result.data,
    });
  },

  async updateMedia(req: Request<UpdateMediaInput['params'], {}, UpdateMediaInput['body']>, res: Response) {
    const result = await mediaServices.updateMedia(req.file as Express.Multer.File, req.params.mediaId);
    if (result.status === 200)
      return response({
        res,
        message: 'رسانه با موفقیت بروزرسانی شد',
      });

    if (result.status === 404)
      return response({
        res,
        message: 'رسانه یافت نشد',
        code: result.status,
      });
  },

  async deleteMedia(req: Request<OneMediaInput['params']>, res: Response) {
    const result = await mediaServices.deleteMedia(req.params.mediaId);

    if (result.status === 200)
      return response({
        res,
        message: 'رسانه با موفقیت حذف شد',
      });

    if (result.status === 404)
      return response({
        res,
        message: 'حذف رسانه ناموفق بود',
        code: result.status,
      });

    throw new Error('something went wrong');
  },
};
