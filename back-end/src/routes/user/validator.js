//validator
const validator = require("../validator");
const { check } = require("express-validator");

module.exports = new (class extends validator {
  updateCheck() {
    return [this.nameCheck];
  }
  avatarCheck() {
    return [check("avatar", "لطفا آواتار خود را انتخاب کنید").notEmpty()];
  }
})();
