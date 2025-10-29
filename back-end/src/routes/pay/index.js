//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/:orderId", controller.postPay.bind(controller));
router.get("/callback", controller.callback.bind(controller));
router.get("/verify", controller.manualVerify.bind(controller));
router.get("/inquiry", controller.inquiry.bind(controller));

module.exports = router;
