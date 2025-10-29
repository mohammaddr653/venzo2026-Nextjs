//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/:categoryString", controller.getArchive.bind(controller));

module.exports = router;
