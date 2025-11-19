//controller
const debug = require("debug")("app");
const controller = require("./../controller");
const bcrypt = require("bcrypt");
const userServices = require("../../services/userServices");
const validateRecaptcha = require("../../helpers/validateRecaptcha");
const setJwtCookie = require("../../helpers/setJwtCookie");

module.exports = new (class extends controller {
  async getRegister(req, res) {
    return this.response({
      res,
      message: "فرم ثبت نام",
    });
  }

  async getLogin(req, res) {
    return this.response({
      res,
      message: "فرم ورود",
    });
  }

  async register(req, res) {
    const recaptchaResult = await validateRecaptcha(req);
    //recaptcha wont authorized if environment config 'recaptcha' is false
    if (!recaptchaResult && process.env.RECAPTCHA === "true") {
      return this.response({
        res,
        code: 400,
        message: "لطفا ریکپچا را تایید کنید",
      });
    }

    //same as create user
    const result = await userServices.registerUser(req, res);

    if (result.status === 400)
      return this.response({
        res,
        message: "کاربری با این ایمیل قبلا ثبت نام کرده است",
        code: result.status,
      });

    if (result.status === 200)
      return this.response({
        res,
        message: "کاربر با موفقیت ثبت نام شد",
        data: result.data,
      });

    throw Error;
  }

  async login(req, res) {
    const recaptchaResult = await validateRecaptcha(req);
    //recaptcha wont authorized if environment config 'recaptcha' is false
    if (!recaptchaResult && process.env.RECAPTCHA === "true") {
      return this.response({
        res,
        code: 400,
        message: "لطفا ریکپچا را تایید کنید",
      });
    }
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "ایمیل یا رمز عبور نامعتبر است",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "ایمیل یا رمز عبور نامعتبر است",
      });
    }
    setJwtCookie(res,user);
    this.response({ res, message: "با موفقیت وارد شدید"});
  }
})();
