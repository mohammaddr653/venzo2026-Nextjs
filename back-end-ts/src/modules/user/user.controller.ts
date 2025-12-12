import response from '#src/helpers/controllerResponse.js';
import { userServices } from '#src/services/user.service.js';
import { Request, Response } from 'express';
import { OneUserInput, UpdateAvatarInput, UpdateProfileInput } from './user.schema.js';

export const userController = {
  async updateProfile(req: Request<{}, {}, UpdateProfileInput['body']>, res: Response) {
    const result = await userServices.updateProfile(req.body, req.user!);

    if (result.status === 200)
      return response({
        res,
        message: ' اکانت شما با موفقیت بروزرسانی شد',
      });

    if (result.status === 404)
      return response({
        res,
        code: result.status,
        message: 'خطا در بروزرسانی',
      });

    throw Error;
  },

  async addAvatar(req: Request<{}, {}, UpdateAvatarInput['body']>, res: Response) {
    const result = await userServices.addAvatar(req.file, req.user!);
    if (result.status === 200)
      return response({
        res,
        message: 'آواتار با موفقیت اضافه شد',
      });

    if (result.status === 404)
      return response({
        res,
        message: 'کاربر یافت نشد',
        code: result.status,
      });

    throw Error;
  },

  async deleteAvatar(req: Request, res: Response) {
    const result = await userServices.deleteAvatar(req.user!);

    if (result.status === 200)
      return response({
        res,
        message: 'آواتار با موفقیت حذف شد',
      });

    if (result.status === 404)
      return response({
        res,
        message: 'کاربر یافت نشد',
        code: result.status,
      });

    throw Error;
  },

  //admin
  async getUsers(req: Request, res: Response) {
    const result = await userServices.getAllUsers(req.user!);
    return response({
      res,
      message: 'this is all users',
      data: result.data,
    });
  },

  async seeOneUser(req: Request<OneUserInput['params']>, res: Response) {
    const result = await userServices.seeOneUser(req.params.userId);
    return response({
      res,
      message: 'this is user',
      data: result.data,
    });
  },
};
