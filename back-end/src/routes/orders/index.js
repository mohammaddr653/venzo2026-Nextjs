//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.get("/", controller.getOrders.bind(controller));
router.get("/:orderId", controller.getOneOrder.bind(controller));
router.post(
  "/",
  validator.newOrderCheck(),
  controller.validate.bind(controller),
  controller.createOrderFromCart.bind(controller)
);

module.exports = router;
