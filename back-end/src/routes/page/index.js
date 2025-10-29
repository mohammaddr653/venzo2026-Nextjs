//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/banners", controller.getBanners.bind(controller));
router.get("/trusts", controller.getTrusts.bind(controller));

module.exports = router;
