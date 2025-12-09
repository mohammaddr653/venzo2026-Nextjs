import { ENV } from '#src/config/env.js';
import { IUserDocument } from '#src/types/user.types.js';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

//this helper sets the jwt cookie as httpOnly cookie

const setJwtCookie = (res: Response, user: IUserDocument) => {
  const token = jwt.sign({ _id: user.id, isadmin: user.isadmin, verified: user.verified }, ENV.JWT_KEY);
  //storing jwt token as a httpOnly cookie
  const mode = ENV.NODE_ENV;

  res.cookie('jwt', token, {
    httpOnly: true,
    path: '/',
    secure: mode === 'production' ? true : false,
    sameSite: mode === 'production' ? 'none' : 'strict',
    maxAge: 604800000,
  });
};

export default setJwtCookie;
