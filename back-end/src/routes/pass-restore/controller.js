//controller
const controller = require("../controller");
const userServices = require("../../services/userServices");
const sendEmail = require("../../mails/passRecovery");

module.exports = new (class extends controller {
  async sendPassRestoreEmail(req, res) {
    const token = await userServices.createResetPasswordToken(req, res);
    if (token.status === 200) {
      let content = `<a href=${
        process.env.ORIGIN_URL + "/pass-restore/" + token.data
      }>برای بازیابی رمزعبور کلیک کنید</a>`;
      sendEmail(req.body.email, content);
      return this.response({
        res,
        message: "لطفا ایمیل خود را چک کنید .",
      });
    }
    if (token.status === 404)
      return this.response({
        res,
        code: token.status,
        message: `کاربر شناسایی نشد`,
      });

    throw Error;
  }
  async restorePass(req, res) {
    const result = await userServices.passwordRestoration(req, res);

    if (result.status === 200)
      return this.response({
        res,
        message: `رمز عبور بازیابی شد`,
      });

    if (result.status === 404)
      return this.response({
        res,
        code: result.status,
        message: `عملیات بازیابی رمز ناموفق بود`,
      });

    throw Error;
  }
})();
