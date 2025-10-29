//validator
const { check } = require("express-validator");
const validator = require("../../validator");

module.exports = new (class extends validator {
  bannerValidator() {
    return [
      check("image", "لطفا تصویری بارگزاری کنید").notEmpty(),
      check("location", "لطفا موقعیت بنر را مشخص کنید").notEmpty(),
      check("show", "لطفا وضعیت بنر را مشخص کنید").notEmpty(),
    ];
  }

  updateBannerValidator() {
    return [
      check("location", "لطفا موقعیت بنر را مشخص کنید").notEmpty(),
      check("show", "لطفا وضعیت بنر را مشخص کنید").notEmpty(),
    ];
  }

  trustValidator() {
    return [
      check("image", "لطفا تصویری بارگزاری کنید").notEmpty(),
      check("title", "لطفا عنوان اعتماد را وارد کنید").notEmpty(),
      check("caption", "لطفا کپشنی برای اعتماد وارد کنید").notEmpty(),
      check("show", "لطفا وضعیت بنر را مشخص کنید").notEmpty(),
    ];
  }

  updateTrustValidator() {
    return [
      check("title", "لطفا عنوان اعتماد را وارد کنید").notEmpty(),
      check("caption", "لطفا کپشنی برای اعتماد وارد کنید").notEmpty(),
      check("show", "لطفا وضعیت اعتماد را مشخص کنید").notEmpty(),
    ];
  }
})();
