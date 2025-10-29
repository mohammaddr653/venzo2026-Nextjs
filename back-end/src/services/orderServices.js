const mongoose = require("mongoose");
const Product = require("../models/product");
const withTransaction = require("../helpers/withTransaction");
const serviceResponse = require("../helpers/serviceResponse");
const Order = require("../models/order");
const Propertyval = require("../models/propertyval");
const getPriceAndStock = require("../helpers/getPriceAndStock");
const totalPriceCalculator = require("../helpers/totalPriceCalculator");

class OrderServices {
  async getUserOrders(req, res) {
    //خواندن سفارش های کاربر از دیتابیس
    const findOp = await Order.find({ userId: req.user._id });
    return serviceResponse(200, findOp);
  }

  async seeOneOrder(req, res) {
    //خواندن یک سفارش از دیتابیس
    const findOp = await Order.findOne({ _id: req.params.orderId });
    return serviceResponse(200, findOp);
  }

  async seeAllOrders(req, res) {
    //خواندن تمام سفارش های فروشگاه از دیتابیس
    const findOp = await Order.find({});
    return serviceResponse(200, findOp);
  }

  async newOrderFromCart(req, res, cart) {
    //ساخت سفارش جدید و خالی کردن سبد خرید
    const productsReadyToPay = [];
    const transactionResult = await withTransaction(async (session) => {
      for (let item of cart.reservedProducts) {
        if (item.selectedPropertyvalString === "") {
          const updateOp = await Product.findOneAndUpdate(
            {
              _id: item.productId,
              stock: { $gte: item.count },
            },
            { $inc: { stock: -item.count } },
            { session }
          )
            .populate({
              path: "properties.property",
              model: "Property",
            })
            .populate({
              path: "properties.values.propertyval",
              model: "Propertyval",
            });

          if (!updateOp) {
            throw new Error("Insufficient stock");
          }
          const { price, discount } = getPriceAndStock(
            item.selectedPropertyvalString,
            updateOp
          );

          const orderProduct = {
            productId: updateOp._id,
            name: updateOp.name,
            price: price,
            discount: discount,
            properties: updateOp.properties,
            count: item.count,
            selectedPropertyvalString: "",
            selectedPropertyval: "",
          };
          productsReadyToPay.push(orderProduct);
        } else {
          const findOp = await Propertyval.findOne(
            {
              _id: item.selectedPropertyvalString,
            },
            null,
            { session }
          );
          if (!findOp) {
            throw new Error("selected propertyval not founded");
          }
          const updateOp = await Product.findOneAndUpdate(
            {
              _id: item.productId,
            },
            { $inc: { "properties.$[prop].values.$[val].stock": -item.count } },
            {
              arrayFilters: [
                { "prop.selective": true },
                {
                  "val.propertyval": item.selectedPropertyvalString,
                  "val.stock": { $gte: item.count },
                },
              ],
              session,
            }
          )
            .populate({ path: "properties.property", model: "Property" })
            .populate({
              path: "properties.values.propertyval",
              model: "Propertyval",
            });

          if (!updateOp) {
            throw new Error("Insufficient stock");
          }
          const { price, discount } = getPriceAndStock(
            item.selectedPropertyvalString,
            updateOp
          );

          const orderProduct = {
            productId: updateOp._id,
            name: updateOp.name,
            price: price,
            discount: discount,
            properties: updateOp.properties,
            count: item.count,
            selectedPropertyvalString: item.selectedPropertyvalString,
            selectedPropertyval: findOp.value,
          };
          productsReadyToPay.push(orderProduct);
        }
      }

      //محاسبه قیمت کل
      const totalPrice = totalPriceCalculator(productsReadyToPay);

      const newOrder = new Order({
        userId: req.user.id,
        products: productsReadyToPay,
        status: "canceled",
        pendingExpire: null,
        totalPrice: totalPrice,
        authority: "",
        authExpire: null,
        referenceId: "",
        receiver: {
          name: req.body.name,
          phone: req.body.phone,
          province: req.body.province,
          city: req.body.city,
          address: req.body.address,
          postalCode: req.body.postalCode,
          note: req.body.note,
        },
      });

      cart.reservedProducts = [];
      const cartUpdateOp = await cart.save({ session });
      const saveOp = await newOrder.save({ session });
      return serviceResponse(200, saveOp);
    });
    return transactionResult;
  }

  //note: this function is useless for now due to the cron job does this operation automatically
  async expireOrder(req, res) {
    const transactionResult = await withTransaction(async (session) => {
      const findOp = await Order.findOneAndUpdate(
        {
          _id: req.params.orderId,
          status: "canceled",
        },
        { $set: { status: "expired" } },
        { session }
      );
      if (!findOp) {
        return serviceResponse(409, {});
      }

      for (let item of findOp.products) {
        if (item.selectedPropertyvalString === "") {
          const updateOp = await Product.updateOne(
            {
              _id: item.productId,
            },
            { $inc: { stock: item.count } },
            { session }
          );
        } else {
          const updateOp = await Product.updateOne(
            {
              _id: item.productId,
            },
            { $inc: { "properties.$[prop].values.$[val].stock": item.count } },
            {
              arrayFilters: [
                { "prop.selective": true },
                {
                  "val.propertyval": item.selectedPropertyvalString,
                },
              ],
              session,
            }
          );
        }
      }

      return serviceResponse(200, {});
    });
    return transactionResult;
  }
}
module.exports = new OrderServices();
