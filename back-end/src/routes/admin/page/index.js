//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

//banners
//get all banners is in /page

router.post(
  "/banners",
  validator.bannerValidator(),
  controller.validate.bind(controller),
  controller.createBanner.bind(controller)
);
router.put(
  "/banners/:bannerId",
  validator.updateBannerValidator(),
  controller.validate.bind(controller),
  controller.updateBanner.bind(controller)
);

router.delete("/banners/:bannerId", controller.deleteBanner.bind(controller));

//trusts
//get all trusts is in /page

router.post(
  "/trusts",
  validator.trustValidator(),
  controller.validate.bind(controller),
  controller.createTrust.bind(controller)
);
router.put(
  "/trusts/:trustId",
  validator.updateTrustValidator(),
  controller.validate.bind(controller),
  controller.updateTrust.bind(controller)
);

router.delete("/trusts/:trustId", controller.deleteTrust.bind(controller));

module.exports = router;
