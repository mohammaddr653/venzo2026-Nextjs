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
    const mode = process.env.NODE_ENV;
    res.clearCookie("jwt", {
      httpOnly: true,
      path: "/",
      secure: mode === "production" ? true : false,
      sameSite: mode === "production" ? "None" : "Strict",
    });
    return this.response({
      res,
      message: "از حساب کاربری خارج شدید",
    });
  }
})();
