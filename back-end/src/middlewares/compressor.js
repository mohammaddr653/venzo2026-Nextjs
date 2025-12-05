const path = require("path");
const sharp = require("sharp");
const pathManager = require("../helpers/pathManager");

const compressor = (dir, resize) => {
  const sharpHandler = async (req, res, next) => {
    async function compress(file) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extName = path.extname(file.originalname);
      const justName = path.parse(file.originalname).name;
      const fileName = uniqueSuffix + "-" + justName;
      const directory = pathManager(dir);
      const sizes = {
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
      file.urls = {};
      await Promise.all(
        Object.entries(sizes).map(async ([key, size]) => {
          let pipeline = sharp(file.buffer).withMetadata();
          const metadata = await pipeline.metadata();

          let width = metadata.width;
          let height = metadata.height;
          if (size && width <= size.width) return;
          let format = extName.substring(1).toLowerCase();

          switch (format) {
            case "png":
              pipeline = pipeline.webp({ quality: 70 });
              format = ".webp";
              break;
            case "webp":
              pipeline = pipeline.webp({ quality: 70 });
              format = ".webp";
              break;
            case "jpg":
              pipeline = pipeline.webp({ quality: 70 });
              format = ".webp";
              break;
            case "jpeg":
              pipeline = pipeline.webp({ quality: 70 });
              format = ".webp";
              break;
            default:
              // اگر فرمت پشتیبانی نشده بود، به jpeg تبدیل کن
              pipeline = pipeline.jpeg({ quality: 70 });
              format = ".jpeg";

              break;
          }
          const url =
            directory +
            "/" +
            fileName +
            (key === "original" ? format : `-${key}${format}`);

          if (size) {
            pipeline = pipeline.resize(size);
            width = Math.round(size.width);
            height = Math.round((width * height) / metadata.width);
          }
          await pipeline.toFile(url);
          const urlObj = {
            url: url.substring(1).replace(/\\/g, "/"), //تنظیم آدرس برای ذخیره در مونگو دی بی
            width: width.toString(),
            height: height.toString(),
          };
          file.urls[key] = urlObj;
        })
      );
    }
    if (req.files && req.files.length) {
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

module.exports = compressor;
