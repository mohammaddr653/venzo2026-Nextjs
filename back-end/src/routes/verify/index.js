//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.sendVerification.bind(controller));
router.post("/", controller.checkVerification.bind(controller));

module.exports = router;
