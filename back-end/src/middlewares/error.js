//using express-async-errors npm package for handeling our server side errors through application instead of try,catch
//using winston npm package for save the error logs in logfile.log
const winston = require("winston");
const deleteWrapper = require("../helpers/deleteWrapper");

module.exports = (err, req, res, next) => {
  if (req.file)
    //if some files uploaded with this req , delete them
    deleteWrapper(req.file.urls);

  if (req.files) {
    for (let file of req.files) {
      deleteWrapper(file.urls);
    }
  }
  console.log(err);
  winston.error(err.message, err);
  res.status(500).json({ message: "خطای سرور" });
};
