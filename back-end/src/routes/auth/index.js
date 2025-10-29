//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.get("/register", controller.getRegister.bind(controller));
router.post(
  "/register",
  validator.registerValidator(),
  controller.validate.bind(controller),
  controller.register.bind(controller)
);

router.get("/login", controller.getLogin.bind(controller));
router.post(
  "/login",
  validator.loginValidator(),
  controller.validate.bind(controller),
  controller.login.bind(controller)
);

module.exports = router;
