const mongoose = require("mongoose");
const Cart = require("../models/cart");
const reservedProduct = require("../models/reservedProduct");
const serviceResponse = require("../helpers/serviceResponse");

class CartServices {
  async checkReservedProducts(reservedProducts) {
    // چک کردن موجودی محصولات سبد خرید ، اگر موجودی کافی نیست محصول حذف شود
    let failedProductObjs = [];
    const finalReservedProducts = reservedProducts.filter((product) => {
      if (product.count > product.stock || product.count <= 0) {
        //اگر تعداد در سبد بیشتر از موجودی شد یا تعداد در سبد کوچکتر از صفر بود محصول باید از سبد حذف شود
        failedProductObjs.push({
          failedId: product._id.toString(),
          selectedPropertyvalString: product.selectedPropertyvalString,
        });
        return false;
      }
      return true;
    });
    return serviceResponse(200, { finalReservedProducts, failedProductObjs });
  }

  async deleteReservedProduct(failedProductObjs, cart) {
    // حذف محصول رزرو شده از سبد خرید ، یک آرایه از آیدی محصولاتی که قصد حذف آنها از سبد خرید را دارید میگیرد
    cart.reservedProducts = cart.reservedProducts.filter(
      (reserved) =>
        !failedProductObjs.some(
          (failedObj) =>
            failedObj.failedId === reserved.productId.toString() &&
            failedObj.selectedPropertyvalString ===
              reserved.selectedPropertyvalString
        )
    );
    await cart.save();
    return serviceResponse(200, {});
  }

  async seeOneCart(req, res) {
    // خواندن یک سبد خرید از دیتابیس
    const findOp = await Cart.findOne({ userId: req.user.id });
    return serviceResponse(200, findOp);
  }

  async existOrNot(req, res, cart) {
    // اگر کالا در حال حاضر در سبد موجود باشه اون رو بر می گرداند وگرنه مقدار تعریف نشده برمیگردونه
    const existing = cart.reservedProducts.find(
      (reserved) =>
        reserved.productId.equals(
          new mongoose.Types.ObjectId(req.params.productId)
        ) &&
        reserved.selectedPropertyvalString ===
          req.body.selectedPropertyvalString
    );
    return serviceResponse(200, existing);
  }
  async addToCart(req, res, cart) {
    //افزودن به سبد خرید
    const reservedProduct = {
      productId: new mongoose.Types.ObjectId(req.params.productId),
      count: 1,
    };
    if (req.body.selectedPropertyvalString) {
      reservedProduct.selectedPropertyvalString =
        req.body.selectedPropertyvalString;
    }
    cart.reservedProducts.push(reservedProduct);
    await cart.save();
    return serviceResponse(200, {});
  }

  async plusCount(req, res, cart) {
    //افزودن به تعداد محصول
    const existing = await cart.reservedProducts.find(
      (reserved) =>
        reserved.productId.equals(
          new mongoose.Types.ObjectId(req.params.productId)
        ) &&
        reserved.selectedPropertyvalString ===
          req.body.selectedPropertyvalString
    );
    if (existing) {
      existing.count += 1;
      await cart.save();
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async minusCount(req, res, cart) {
    //کم کردن از تعداد محصول
    const existing = await cart.reservedProducts.find(
      (reserved) =>
        reserved.productId.equals(
          new mongoose.Types.ObjectId(req.params.productId)
        ) &&
        reserved.selectedPropertyvalString ===
          req.body.selectedPropertyvalString
    );
    if (existing) {
      existing.count -= 1;
      await cart.save();
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async deleteCart(req, res, next) {
    //حذف سبد خرید
    const deleteOp = await Cart.deleteOne({ userId: req.params.userId });
    if (deleteOp.deletedCount > 0) return serviceResponse(200, {});
    return serviceResponse(404, {});
  }
}
module.exports = new CartServices();
