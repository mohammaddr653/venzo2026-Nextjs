import { NextFunction, Request, Response } from 'express';

const fileToReqBodyHandler = (fieldName: string, multiple: boolean = false) => {
  const fileToReqBody = (req: Request, _res: Response, next: NextFunction) => {
    if (multiple) {
      if (!req.files || !req.files.length) {
        req.body[fieldName] = null;
      } else {
        req.body[fieldName] = req.files;
      }
    } else {
      if (!req.file) {
        req.body[fieldName] = null;
      } else {
        req.body[fieldName] = req.file;
      }
    }
    next();
  };
  return fileToReqBody;
};

export default fileToReqBodyHandler;
