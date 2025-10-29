//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getProducts.bind(controller));
router.get("/most-products", controller.getMostProducts.bind(controller));
router.get("/:categoryString", controller.getShopByCategory.bind(controller));
router.get(
  "/filters/:categoryString",
  controller.getFiltersByCategory.bind(controller)
);

module.exports = router;
