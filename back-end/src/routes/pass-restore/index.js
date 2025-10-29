//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.post(
  "/",
  validator.passRestoreEmailCheck(),
  controller.validate.bind(controller),
  controller.sendPassRestoreEmail.bind(controller)
);

router.post(
  "/:token",
  validator.passRestorePasswordCheck(),
  controller.validate.bind(controller),
  controller.restorePass.bind(controller)
);

module.exports = router;
