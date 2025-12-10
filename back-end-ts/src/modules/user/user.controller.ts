import response from '#src/helpers/controllerResponse.js';
import { userServices } from '#src/services/user.service.js';
import { Request, Response } from 'express';
import { UpdateProfileInput } from './user.schema.js';

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
};
