//controller
const controller = require("../controller");
const userServices = require("../../services/userServices");
const sendEmail = require("../../mails/emailVerification");

module.exports = new (class extends controller {
  createCode() {
    this.code = Math.floor(Math.random() * 9000 + 1000).toString();
  }
  async sendVerification(req, res) {
    this.createCode();
    const response = sendEmail(req.user.email, this.code);
    return this.response({
      res,
      message: "ایمیل ارسال شد",
    });
  }
  async checkVerification(req, res) {
    if (req.body.code === this.code) {
      const response = await userServices.verifyUser(req, res);

      if (response.status === 200)
        return this.response({
          res,
          message: "ایمیل شما با موفقیت تایید شد",
        });

      if (response.status === 404)
        return this.response({
          res,
          message: "کاربر شناسایی نشد",
          code: response.status,
        });

      throw Error;
    } else {
      return this.response({
        res,
        code: 400,
        message: "کد وارد شده مطابقت نداشت",
      });
    }
  }
})();
