//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getMe.bind(controller));
router.get("/logout", controller.logout.bind(controller));

module.exports = router;
