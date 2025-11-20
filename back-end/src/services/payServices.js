const mongoose = require("mongoose");
const Cart = require("../models/cart");
const reservedProduct = require("../models/reservedProduct");
const serviceResponse = require("../helpers/serviceResponse");
const { ZarinPal } = require("zarinpal-node-sdk");
const Order = require("../models/order");
const sendEmail = require("../mails/newOrder");
const User = require("../models/user");

const zarinpal = new ZarinPal({
  merchantId: process.env.MERCHANT_ID,
  sandbox: true,
});

class PayServices {
  async postPay(req, res) {
    //دریافت اطلاعات سفارش
    const pendingExpire = new Date(Date.now() + 15 * 60 * 1000); //پانزده دقیقه اعتبار
    const updateOp = await Order.findOneAndUpdate(
      {
        _id: req.params.orderId,
        status: { $nin: ["paid", "expired", "check"] },
      },
      { $set: { status: "pending", pendingExpire: pendingExpire } }
    );

    if (!updateOp) {
      return serviceResponse(409, {});
    }
    if (
      updateOp.authExpire &&
      updateOp.authority &&
      new Date() < updateOp.authExpire
    ) {
      return serviceResponse(200, updateOp.authority); // همان شناسه قبلی را بده
    }
    try {
      const response = await zarinpal.payments.create({
        amount: updateOp.totalPrice,
        callback_url: "http://127.0.0.1:5000/api/pay/callback",
        description: "Payment for order #1234",
        mobile: "09123456789",
        email: "customer@example.com",
        cardPan: ["6219861034529007", "5022291073776543"],
        referrer_id: "affiliate123",
      });

      //authority should be saved in database
      updateOp.authority = response.data.authority;
      updateOp.authExpire = new Date(Date.now() + 15 * 60 * 1000); //پانزده دقیقه اعتبار
      const saveOp = await updateOp.save();
      if (saveOp.authority === response.data.authority) {
        return serviceResponse(200, response.data.authority);
      }
    } catch (error) {
      console.log(error);
    }
    return serviceResponse(500, {});
  }

  async verifyPayment(req, res) {
    //تایید یا رد سفارش
    const { Authority, Status } = req.query;
    const findOp = await Order.findOne({ authority: Authority });
    if (!findOp) {
      //سفارش یافت نشد
      return serviceResponse(404, {});
    }
    if (Status === "NOK" && findOp.referenceId === "") {
      //پرداخت ناموفق
      findOp.status = "canceled";
      const saveOp = await findOp.save();
      return serviceResponse(400, {});
    }

    try {
      const response = await zarinpal.verifications.verify({
        amount: findOp.totalPrice,
        authority: findOp.authority,
      });

      if (response.data.code === 100) {
        console.log("Payment Verified:");
        console.log("Reference ID:", response.data.ref_id);
        console.log("Card PAN:", response.data.card_pan);
        console.log("Fee:", response.data.fee);
        findOp.status = "paid";
        findOp.referenceId = response.data.ref_id;
        const saveOp = await findOp.save();
        //ارسال ایمیل به مشتری
        const client = await User.findById(saveOp.userId);
        let clientContent = `<p>از خرید شما ممنونیم . سفارش شما تایید شد و درحال آماده سازی برای ارسال است .</p>
        <p>شماره سفارش :</p>
        <p>${saveOp._id}</p>
        <br/>
        <p>شناسه تراکنش :</p>
        <p>${saveOp.authority}</p>
        <br/>
        <p>کد رهگیری :</p>
        <p>${saveOp.referenceId}</p>`;
        sendEmail(
          "فاکتور خرید از فروشگاه اینترنتی وانیمارت",
          client.email,
          clientContent
        );
        //ارسال ایمیل به ادمین
        let content = `<a href='${process.env.ORIGIN_URL}/admin/orders'>سفارش جدیدی ثبت شد . لطفا بررسی کنید .</a>
        <p>شماره سفارش :</p>
        <p>${saveOp._id}</p>
        <br/>
        <p>شناسه تراکنش :</p>
        <p>${saveOp.authority}</p>
        <br/>
        <p>کد رهگیری :</p>
        <p>${saveOp.referenceId}</p>`;
        sendEmail("سفارش جدیدی دارید", "mohammaddr653@gmail.com", content);

        return serviceResponse(200, findOp._id);
      } else if (response.data.code === 101) {
        console.log("Payment already verified.");
        findOp.status = "paid";
        const saveOp = await findOp.save();
        return serviceResponse(101, {});
      } else {
        console.log("Transaction failed with code:", response.data.code);
        findOp.status = "check"; //نیاز به بررسی
        const saveOp = await findOp.save();
        return serviceResponse(401, {});
      }
    } catch (error) {
      console.error("Payment Verification Failed:", error);
      findOp.status = "check"; //نیاز به بررسی
      const saveOp = await findOp.save();
    }
    return serviceResponse(500, {});
  }

  async inquireTransaction(req, res) {
    //استعلام تراکنش
    const { Authority } = req.query;

    try {
      const inquiryResult = await zarinpal.inquiries.inquire({
        authority: Authority,
      });

      return serviceResponse(200, inquiryResult);
    } catch (error) {
      console.error("Error during inquiry:", error);
    }
    return serviceResponse(500, {});
  }
}
module.exports = new PayServices();
