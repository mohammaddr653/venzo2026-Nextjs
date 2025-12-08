import response from '#src/helpers/controllerResponse.js';
import validateRecaptcha from '#src/helpers/validateRecaptcha.js';
import { Request, Response } from 'express';
import { userServices } from '../user/user.service.js';
import { ENV } from '#src/config/env.js';

export const authController = {
  //register
  async register(req: Request, res: Response) {
    const recaptchaResult = await validateRecaptcha(req);
    //recaptcha wont authorized if environment config 'recaptcha' is false
    if (!recaptchaResult && ENV.RECAPTCHA === 'true') {
      return response({
        res,
        code: 400,
        message: 'لطفا ریکپچا را تایید کنید',
      });
    }

    //same as create user
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

    throw Error;
  },
};
