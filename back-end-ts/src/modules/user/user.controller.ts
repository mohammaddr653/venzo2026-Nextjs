import response from '#src/helpers/controllerResponse.js';
import { userServices } from '#src/services/user.service.js';
import { Request, Response } from 'express';
import { CreateUserInput, DeleteUserInput, OneUserInput, UpdateAvatarInput, UpdateProfileInput, UpdateUserInput } from './user.schema.js';

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

  async createUser(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    const result = await userServices.registerUser(req.body);

    if (result.status === 400)
      return response({
        res,
        message: 'کاربری با این ایمیل قبلا ثبت نام کرده است',
        code: result.status,
      });

    if (result.status === 200)
      return response({
        res,
        message: 'کاربر با موفقیت ثبت نام شد',
        data: result.data,
      });

    throw new Error('something went wrong');
  },

  async updateUser(req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, res: Response) {
    const result = await userServices.updateUser(req.params.userId, req.body);

    if (result.status === 200)
      return response({
        res,
        message: 'کاربر با موفقیت بروزرسانی شد',
      });

    if (result.status === 400)
      return response({
        res,
        message: 'کاربری با این ایمیل قبلا ثبت نام کرده است',
        code: result.status,
      });

    throw new Error('something went wrong');
  },

  async deleteUser(req: Request<DeleteUserInput['params']>, res: Response) {
    const result = await userServices.deleteUser(req.params.userId, req.user!);

    if (result.status === 200)
      return response({
        res,
        message: 'کاربر با موفقیت حذف شد',
      });

    if (result.status === 400)
      return response({
        res,
        message: 'شما نمیتوانید خود را حذف کنید',
        code: result.status,
      });

    if (result.status === 404)
      return response({
        res,
        message: 'حذف کاربر ناموفق بود',
        code: result.status,
      });

    throw new Error('something went wrong');
  },
};
