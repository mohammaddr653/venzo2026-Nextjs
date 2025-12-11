import pathManager from '#src/helpers/pathManager.js';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';

interface Size {
  width: number;
}
interface Sizes {
  original: Size | null;
  small?: Size;
  medium?: Size;
  large?: Size;
}

const compressor = (dir: string, resize: boolean) => {
  const sharpHandler = async (req: Request, _res: Response, next: NextFunction) => {
    async function compress(file: Express.Multer.File) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extName = path.extname(file.originalname);
      const justName = path.parse(file.originalname).name;
      const fileName = uniqueSuffix + '-' + justName;
      const directory = pathManager(dir);
      let sizes: Sizes = {
        original: null, // بدون تغییر سایز
      };
      if (resize) {
        sizes = {
          ...sizes,
          small: { width: 320 },
          medium: { width: 640 },
          large: { width: 1024 },
        };
      }
      await Promise.all(
        Object.entries(sizes).map(async ([k, size]) => {
          const key = k as keyof Sizes;
          console.log(typeof key);
          let pipeline = sharp(file.buffer).withMetadata();
          const metadata = await pipeline.metadata();

          let width = metadata.width;
          let height = metadata.height;
          if (size && width <= size.width) return;
          let format = extName.substring(1).toLowerCase();

          switch (format) {
            case 'png':
              pipeline = pipeline.webp({ quality: 70 });
              format = '.webp';
              break;
            case 'webp':
              pipeline = pipeline.webp({ quality: 70 });
              format = '.webp';
              break;
            case 'jpg':
              pipeline = pipeline.webp({ quality: 70 });
              format = '.webp';
              break;
            case 'jpeg':
              pipeline = pipeline.webp({ quality: 70 });
              format = '.webp';
              break;
            default:
              // اگر فرمت پشتیبانی نشده بود، به jpeg تبدیل کن
              pipeline = pipeline.jpeg({ quality: 70 });
              format = '.jpeg';

              break;
          }
          const url = directory + '/' + fileName + (key === 'original' ? format : `-${key}${format}`);

          if (size) {
            pipeline = pipeline.resize(size);
            width = Math.round(size.width);
            height = Math.round((width * height) / metadata.width);
          }
          await pipeline.toFile(url);
          const urlObj = {
            url: url.substring(1).replace(/\\/g, '/'), //تنظیم آدرس برای ذخیره در مونگو دی بی
            width: width.toString(),
            height: height.toString(),
          };
          file.urls = { ...file.urls, [key]: urlObj };
        }),
      );
    }
    if (Array.isArray(req.files) && req.files.length) {
      for (let file of req.files) {
        await compress(file);
      }
    }
    if (req.file) {
      await compress(req.file);
    }
    next();
  };
  return sharpHandler;
};

export default compressor;
