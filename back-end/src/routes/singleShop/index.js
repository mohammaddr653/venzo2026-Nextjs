//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/:productId", controller.getSingleShop.bind(controller));
router.get(
  "/withProperties/:productId",
  controller.getSingleShopWithProperties.bind(controller)
);

module.exports = router;
