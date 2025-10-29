//validator
const validator = require("../validator");

module.exports = new (class extends validator {
  passRestoreEmailCheck() {
    return [this.emailCheck];
  }
  passRestorePasswordCheck() {
    return [this.passCheck];
  }
})();
