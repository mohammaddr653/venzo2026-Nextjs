//این فایل را خودم قرار دادم تا یوزر را به تایپ Request اضافه کنم
import { IUserDocument } from './user.types.ts';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument | null;
    }
  }
}
