import response from '#src/helpers/controllerResponse.js';
import validateRecaptcha from '#src/helpers/validateRecaptcha.js';
import { Request, Response } from 'express';
import { userServices } from '../../services/user.service.js';
import { ENV } from '#src/config/env.js';
import bcrypt from 'bcrypt';
import User from '#src/models/user.js';
import setJwtCookie from '#src/helpers/setJwtCookie.js';
import { LoginInput, RegisterInput } from './auth.schema.js';

export const authController = {
  //register
  async register(req: Request<{}, {}, RegisterInput['body']>, res: Response) {
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

  async login(req: Request<{}, {}, LoginInput['body']>, res: Response) {
    const recaptchaResult = await validateRecaptcha(req);
    //recaptcha wont authorized if environment config 'recaptcha' is false
    if (!recaptchaResult && ENV.RECAPTCHA === 'true') {
      return response({
        res,
        code: 400,
        message: 'لطفا ریکپچا را تایید کنید',
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return response({
        res,
        code: 400,
        message: 'ایمیل یا رمز عبور نامعتبر است',
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return response({
        res,
        code: 400,
        message: 'ایمیل یا رمز عبور نامعتبر است',
      });
    }
    setJwtCookie(res, user);
    response({ res, message: 'با موفقیت وارد شدید' });
  },
};
