//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getCart.bind(controller));

router.post("/:productId", controller.addToCart.bind(controller));

router.put("/plus/:productId", controller.plusCount.bind(controller));

router.put("/minus/:productId", controller.minusCount.bind(controller));

router.delete(
  "/delete/:productId",
  controller.deleteReservedProduct.bind(controller)
);

module.exports = router;
