//this cron job swith pending status to cancel after 15 min / switch cancel status to expire after 1 hour
const cron = require("node-cron");
const Order = require("../src/models/order");
const withTransaction = require("../src/helpers/withTransaction");
const Product = require("../src/models/product");

const orderStatusSwitch = async () => {
  try {
    const findOp = await Order.find({
      status: { $in: ["pending", "canceled"] },
    });
    for (const item of findOp) {
      if (
        item.status === "pending" &&
        item.pendingExpire &&
        new Date() >= item.pendingExpire
      ) {
        item.status = "canceled";
        console.log("order " + item._id + " canceled");
        const saveOp = await item.save();
      } else if (
        item.pendingExpire &&
        new Date(Date.now() - 45 * 60 * 1000) >= item.pendingExpire // یکساعت بعد از ایجاد pendingExpire مهلت انقضا
      ) {
        const transactionResult = await withTransaction(async (session) => {
          item.status = "expired";
          const saveOp = await item.save({ session });

          for (let reservedProduct of saveOp.products) {
            if (reservedProduct.selectedPropertyvalString === "") {
              const updateOp = await Product.updateOne(
                {
                  _id: reservedProduct.productId,
                },
                { $inc: { stock: reservedProduct.count } },
                { session }
              );
            } else {
              const updateOp = await Product.updateOne(
                {
                  _id: reservedProduct.productId,
                },
                {
                  $inc: {
                    "properties.$[prop].values.$[val].stock":
                      reservedProduct.count,
                  },
                },
                {
                  arrayFilters: [
                    { "prop.selective": true },
                    {
                      "val.propertyval":
                        reservedProduct.selectedPropertyvalString,
                    },
                  ],
                  session,
                }
              );
            }
          }
          console.log("order " + item._id + " expired");
        });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

cron.schedule("*/5 * * * *", orderStatusSwitch);
