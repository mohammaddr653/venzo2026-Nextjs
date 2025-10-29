const fileToReqBodyHandler = (fieldName, multiple = false) => {
  const fileToReqBody = (req, res, next) => {
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

module.exports = fileToReqBodyHandler;
