//controller
const debug = require("debug")("app");
const cartServices = require("../../services/cartServices");
const productServices = require("../../services/productServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async getCart(req, res) {
    //سبد خرید رو میگیره و میره تمام محصولاتی که در سبد خرید هستند رو پیدا میکنه و درون یک آرایه به سمت کاربر میفرسته
    const { data: cart } = await cartServices.seeOneCart(req, res);
    const { data: reservedProducts } = await productServices.getProductsOfCart(
      cart,
      req,
      res
    );
    //چک کردن موجودی محصولات سبد خرید ، محصولی که موجودی کافی نداشته باشد را هم از دیتابیس و هم از آرایه محصولات رزرو شده حذف میکند
    //ممکن است زمانی که این محصولات به سبد افزوده شده اند موجودی کافی بوده اما هربار که سبد خرید لود می شود باید دوباره بررسی کرد که آیا محصولات همچنان موجودی دارند یا خیر
    const { data: results } = await cartServices.checkReservedProducts(
      reservedProducts
    );
    //قیمت نهایی را محاسبه میکند
    const { data: totalPrice } = await productServices.totalPrice(
      results.finalReservedProducts,
      req,
      res
    );
    if (results.failedProductObjs.length) {
      await cartServices.deleteReservedProduct(results.failedProductObjs, cart);
    }
    return this.response({
      res,
      message: "this is cart",
      data: {
        reservedProducts: results.finalReservedProducts,
        totalPrice,
      },
    });
  }

  async addToCart(req, res) {
    const { data: cart } = await cartServices.seeOneCart(req, res);
    const { data: existing } = await cartServices.existOrNot(req, res, cart);
    //تعدادی که از این محصول در سبد خرید موجود داریم

    if (!existing) {
      const stock = await productServices.stockCheck(
        req,
        res,
        req.body.selectedPropertyvalString
      ); //تعداد در انبار
      if (stock.status === 200 && stock.data >= 1) {
        await cartServices.addToCart(req, res, cart);
        return this.response({
          res,
          message: "این محصول به سبد خرید اضافه شد",
        });
      }
      if (stock.status === 404)
        return this.response({
          res,
          message: "محصول یافت نشد",
          code: stock.status,
        });
      return this.response({
        res,
        message: "موجودی محصول کافی نیست",
        code: 400,
      });
    } else {
      return this.response({
        res,
        message: "این محصول در سبد خرید موجود است",
        code: 400,
      });
    }
  }

  async plusCount(req, res) {
    const { data: cart } = await cartServices.seeOneCart(req, res);
    const { data: existing } = await cartServices.existOrNot(req, res, cart);
    if (existing && existing.count >= 1) {
      const stock = await productServices.stockCheck(
        req,
        res,
        existing.selectedPropertyvalString
      ); //تعداد در انبار
      if (stock.status === 200 && existing.count + 1 <= stock.data) {
        //تعدادی که از این محصول در سبد خرید موجود داریم
        const result = await cartServices.plusCount(req, res, cart);
        if (result.status === 200) {
          return this.response({
            res,
            message: "تعداد محصول اضافه شد",
          });
        }
        if (result.status === 404) {
          return this.response({
            res,
            message: "خطا در اضافه کردن محصول",
            code: result.status,
          });
        }
        throw Error;
      }
      if (stock.status === 404)
        return this.response({
          res,
          message: "محصول یافت نشد",
          code: stock.status,
        });
      return this.response({
        res,
        message: "موجودی محصول کافی نیست",
        code: 400,
      });
    } else {
      return this.response({
        res,
        message: "محصول در سبد خرید یافت نشد",
        code: 400,
      });
    }
  }

  async minusCount(req, res) {
    const { data: cart } = await cartServices.seeOneCart(req, res);
    //تعدادی که از این محصول در سبد خرید موجود داریم
    const { data: existing } = await cartServices.existOrNot(req, res, cart);
    if (existing && existing.count >= 1) {
      if (existing.count - 1 <= 0) {
        await cartServices.deleteReservedProduct(
          [
            {
              failedId: req.params.productId,
              selectedPropertyvalString: req.body.selectedPropertyvalString,
            },
          ],
          cart
        );
        return this.response({
          res,
          message: "محصول از سبد خرید حذف شد",
        });
      } else {
        const result = await cartServices.minusCount(req, res, cart);
        if (result.status === 200) {
          return this.response({
            res,
            message: "تعداد محصول کم شد",
          });
        }
        if (result.status === 404) {
          return this.response({
            res,
            message: "خطایی رخ داد",
            code: result.status,
          });
        }
        throw Error;
      }
    } else {
      return this.response({
        res,
        message: "خطایی رخ داد",
        code: 400,
      });
    }
  }

  async deleteReservedProduct(req, res) {
    const { data: cart } = await cartServices.seeOneCart(req, res);
    await cartServices.deleteReservedProduct(
      [
        {
          failedId: req.params.productId,
          selectedPropertyvalString: req.body.selectedPropertyvalString,
        },
      ],
      cart
    );
    return this.response({
      res,
      message: "محصول از سبد خرید حذف شد",
    });
  }
})();
