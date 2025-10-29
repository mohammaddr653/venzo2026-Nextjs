//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getHome.bind(controller));

module.exports = router;
