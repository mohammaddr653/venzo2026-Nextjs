//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const uploadHandler = require("../../helpers/uploadHandler");
const compressor = require("../../middlewares/compressor");
const fileToReqBodyHandler = require("../../middlewares/fileToReqBody");

router.get("/dashboard", controller.dashboard.bind(controller));
router.put(
  "/dashboard",
  validator.updateCheck(),
  controller.validate.bind(controller),
  controller.updateProfile.bind(controller)
);
router.post(
  "/dashboard/avatar",
  uploadHandler("avatar", /jpeg|jpg|png/, false, 1),
  compressor("./uploads/avatars",true),
  fileToReqBodyHandler("avatar", false),
  validator.avatarCheck(),
  controller.validate.bind(controller),
  controller.addAvatar.bind(controller)
);

router.delete("/dashboard/avatar", controller.deleteAvatar.bind(controller));

module.exports = router;
