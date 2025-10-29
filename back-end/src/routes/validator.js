const { check } = require("express-validator");

class Validator {
  constructor() {
    this.emailCheck = check("email", "فرمت ایمیل صحیح نیست").isEmail();
    this.nameCheck = check("name", "نام نمی تواند خالی باشد").notEmpty();
    this.passCheck = check(
      "password",
      "پسورد وارد شده مورد قبول نیست"
    ).notEmpty();
  }
}
module.exports = Validator;
