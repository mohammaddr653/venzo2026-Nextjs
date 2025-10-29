//validator
const { check, body } = require("express-validator");
const validator = require("../validator");

module.exports = new (class extends validator {
  newOrderCheck() {
    return [
      check(
        ["name", "phone", "province", "city", "address", "postalCode"],
        "لطفا مشخصات گیرنده را بطور کامل وارد کنید"
      ).notEmpty(),
    ];
  }
})();
