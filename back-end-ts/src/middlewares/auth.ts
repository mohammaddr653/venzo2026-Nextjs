import { ENV } from '#src/config/env.js';
import response from '#src/helpers/controllerResponse.js';
import User from '#src/models/user.js';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

//this middleware checks if a valid token exists , set the value of req.user
async function setReqUser(req: Request, res: Response, next: NextFunction) {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, ENV.JWT_KEY) as jwt.JwtPayload;
      const user = await User.findById(decoded._id);
      req.user = user;
      next();
    } catch (ex) {
      req.user = null;
      res.clearCookie('jwt');
      return response({ res, code: 400, message: 'invalid token' });
    }
  } else {
    req.user = null;
    next();
  }
}

//this middleware checks if req.user exists to access the account or not
async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  return response({ res, code: 401, message: 'لطفا وارد حساب کاربری خود شوید' }); //401 means is not logged in
}

//this middleware checks that user not verified
async function notVerified(req: Request, res: Response, next: NextFunction) {
  if (req.user && !req.user.verified) {
    return next();
  }
  return response({ res, code: 403, message: 'اجازه دسترسی به این مسیر را ندارید' });
}

//this middleware checks that user verified
async function verified(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.verified) {
    return next();
  }
  return response({ res, code: 403, message: 'اجازه دسترسی به این مسیر را ندارید' });
}

//this middleware checks if the req.user exists it cant access the auth anymore
async function notLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return next();
  return response({ res, code: 403, message: 'اجازه دسترسی به این مسیر را ندارید' });
}

//this middleware checks if user is admin to access the admin dashboard or not
async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user && !req.user.isadmin) {
    return response({ res, code: 403, message: 'اجازه دسترسی به این مسیر را ندارید' });
  }
  next();
}

export { isLoggedIn, isAdmin, notVerified, verified, notLoggedIn, setReqUser };
