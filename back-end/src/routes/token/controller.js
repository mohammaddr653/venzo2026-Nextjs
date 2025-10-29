//controller
const controller = require("../controller");

module.exports = new (class extends controller {
  async getMe(req, res) {
    return this.response({
      res,
      message: "اطلاعات استخراج شده از توکن",
      data: {
        user: req.user,
      },
    });
  }

  async logout(req, res) {
    res.clearCookie("jwt");
    return this.response({
      res,
      message: "از حساب کاربری خارج شدید",
    });
  }
})();
