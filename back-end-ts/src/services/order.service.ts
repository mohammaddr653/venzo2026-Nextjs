import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import withTransaction from '#src/helpers/withTransaction.js';
import Order from '#src/models/order.js';
import Product from '#src/models/product.js';
import mongoose from 'mongoose';

export const orderServices = {
  async seeAllOrders(): Promise<ServiceResponse> {
    //خواندن تمام سفارش های فروشگاه از دیتابیس
    const findOp = await Order.find({});
    return serviceResponse(200, findOp);
  },

  //note: this function is useless for now due to the cron job does this operation automatically
  async expireOrder(orderId: string) {
    const transactionResult = await withTransaction(async (session: mongoose.mongo.ClientSession) => {
      const findOp = await Order.findOneAndUpdate(
        {
          _id: orderId,
          status: 'canceled',
        },
        { $set: { status: 'expired' } },
        { session },
      );
      if (!findOp) {
        return serviceResponse(409, {});
      }

      for (let item of findOp.products) {
        if (item.selectedPropertyvalString === '') {
          await Product.updateOne(
            {
              _id: item.productId,
            },
            { $inc: { stock: item.count } },
            { session },
          );
        } else {
          await Product.updateOne(
            {
              _id: item.productId,
            },
            { $inc: { 'properties.$[prop].values.$[val].stock': item.count } },
            {
              arrayFilters: [
                { 'prop.selective': true },
                {
                  'val.propertyval': item.selectedPropertyvalString,
                },
              ],
              session,
            },
          );
        }
      }

      return serviceResponse(200, {});
    });
    return transactionResult;
  },
};
