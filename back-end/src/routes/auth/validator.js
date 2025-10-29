//validator
const validator = require("../validator");

module.exports = new (class extends validator {
  registerValidator() {
    return [this.emailCheck, this.nameCheck, this.passCheck];
  }
  loginValidator() {
    return [this.emailCheck, this.passCheck];
  }
})();
