//controller
const debug = require("debug")("app");
const { validationResult } = require("express-validator");
const User = require("./../models/user");
const serverResponse = require("../helpers/serverResponse");
const deleteWrapper = require("../helpers/deleteWrapper");
module.exports = class {
  constructor() {
    this.User = User; //so we can access the User model in all controllers that extend this controller
  }

  //this is the structure of our response to requests
  response({ res, message, code = 200, data }) {
    const response = serverResponse(message, data);
    res.status(code).json(response);
  }

  //this method checks if we have validation errors then send response & returns false otherwise returns true
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const resultArray = result.array();
      const errors = [];
      resultArray.forEach((error) => errors.push(error.msg));
      this.response({
        res,
        message: "validation error",
        code: 400,
        data: { errors },
      });
      return false;
    }
    return true;
  }

  //this method works with 'validationBody()' & checks if it returns true or false
  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      if (req.file)
        //if some files uploaded with this req , delete them
        deleteWrapper(req.file.urls);

      if (req.files) {
        for (let file of req.files) {
          deleteWrapper(file.urls);
        }
      }
      return; //operation stops here
    }
    next(); //operation continues
  }
};
