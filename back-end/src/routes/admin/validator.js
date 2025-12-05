//validator
const { check, body } = require("express-validator");
const validator = require("../validator");

module.exports = new (class extends validator {
  createCheck() {
    return [this.emailCheck, this.passCheck];
  }
  updateProfileCheck() {
    return [this.nameCheck];
  }
  updateCheck() {
    return [this.emailCheck];
  }
  categoryValidator() {
    return [
      check("name", "لطفا نام دسته بندی را انتخاب کنید").notEmpty(),
      check("type")
        .notEmpty()
        .withMessage("نوع دسته‌بندی نباید خالی باشد")
        .isIn(["link", "shop", "archive", "box"])
        .withMessage("نوع دسته‌بندی نامعتبر است"),
      body("link").custom((value, { req }) => {
        if (req.body.type && req.body.type === "link") {
          if (!(typeof value === "string" && value.trim().length > 0)) {
            throw new Error("لطفا آدرس لینک را وارد کنید");
          }
        }
        return true;
      }),
    ];
  }
  categoryUpdateCheck() {
    return [
      check("name", "لطفا نام دسته بندی را انتخاب کنید").notEmpty(),
      check("motherId", "لطفا دسته مادر را انتخاب کنید").notEmpty(),
      check("type")
        .notEmpty()
        .withMessage("نوع دسته‌بندی نباید خالی باشد")
        .isIn(["link", "shop", "archive", "box"])
        .withMessage("نوع دسته‌بندی نامعتبر است"),
      body("link").custom((value, { req }) => {
        if (req.body.type && req.body.type === "link") {
          if (!(typeof value === "string" && value.trim().length > 0)) {
            throw new Error("لطفا آدرس لینک را وارد کنید");
          }
        }
        return true;
      }),
    ];
  }
  productValidator() {
    return [
      check("name", "لطفا نام محصول را انتخاب کنید").notEmpty(),
      check("price", " قیمت محصول باید مقداری عددی باشد").isNumeric(),
      check("stock", " موجودی انبار باید مقداری عددی باشد").isNumeric(),
    ];
  }
  updateProductValidator() {
    return [
      check("name", "لطفا نام محصول را انتخاب کنید").notEmpty(),
      check("price", " قیمت محصول باید مقداری عددی باشد").isNumeric(),
      check("stock", " موجودی انبار باید مقداری عددی باشد").isNumeric(),
    ];
  }
  propertyValidator() {
    return [
      check("name", "لطفا نام ویژگی را انتخاب کنید").notEmpty(),
      check("type", "لطفا نوع نمایش را انتخاب کنید").notEmpty(),
    ];
  }
  updatePropertyValidator() {
    return [check("name", "لطفا نام ویژگی را انتخاب کنید").notEmpty()];
  }

  propertyvalValidator() {
    return [
      check("value", "لطفا مقدار را وارد کنید").notEmpty(),
      check("propertyId", "لطفا ویژگی را مشخص کنید").notEmpty(),
    ];
  }

  updatePropertyvalValidator() {
    return [check("value", "لطفا مقدار را وارد کنید").notEmpty()];
  }

  blogValidator() {
    return [
      check("title", "لطفا عنوانی برای مقاله انتخاب کنید").notEmpty(),
      check("author", "لطفا نام نویسنده را وارد کنید").notEmpty(),
    ];
  }
  updateBlogValidator() {
    return [
      check("title", "لطفا عنوانی برای مقاله انتخاب کنید").notEmpty(),
      check("author", "لطفا نام نویسنده را وارد کنید").notEmpty(),
    ];
  }
  mediaValidator() {
    return [check("media", "لطفا رسانه ای بارگزاری کنید").notEmpty()];
  }
  fileValidator() {
    return [check("file", "لطفا فایلی بارگزاری کنید").notEmpty()];
  }
})();
