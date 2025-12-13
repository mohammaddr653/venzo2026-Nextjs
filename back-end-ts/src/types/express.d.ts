//این فایل را خودم قرار دادم تا یوزر را به تایپ Request اضافه کنم
import { UrlsObjSchema } from './urlsObj.types.ts';
import { IUserDocument } from './user.types.ts';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument | null;
      // file?: Express.Multer.File | null;
      // files?: Express.Multer.File[] | null;
    }
    namespace Multer {
      interface File {
        urls?: UrlsObjSchema;
      }
    }
  }
}
