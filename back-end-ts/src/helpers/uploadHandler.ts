import multer from 'multer';
import path from 'path';

const uploadHandler = (fieldName: string, regExp: RegExp, multiple: boolean, size: number) => {
  const storage = multer.memoryStorage();
  function checkFileType(file: any, cb: any) {
    // Allowed ext
    const filetypes = regExp;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toString());

    if (extname) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  }
  const upload = multer({
    storage: storage,
    limits: { fileSize: size * 1024 * 1024 },
    fileFilter: function (_req, file, cb) {
      checkFileType(file, cb);
    },
  });

  if (multiple) {
    return upload.array(fieldName, 10);
  }
  return upload.single(fieldName);
};

export default uploadHandler;
