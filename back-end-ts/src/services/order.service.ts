import getPriceAndStock from '#src/helpers/getPriceAndStock.js';
import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import totalPriceCalculator from '#src/helpers/totalPriceCalculator.js';
import withTransaction from '#src/helpers/withTransaction.js';
import Order from '#src/models/order.js';
import Product from '#src/models/product.js';
import Propertyval from '#src/models/propertyval.js';
import { CreateOrderInput } from '#src/modules/order/order.schema.js';
import mongoose from 'mongoose';

export const orderServices = {
  async seeAllOrders(): Promise<ServiceResponse> {
    //خواندن تمام سفارش های فروشگاه از دیتابیس
    const findOp = await Order.find({});
    return serviceResponse(200, findOp);
  },

  //note: this function is useless for now due to the cron job does this operation automatically
  async expireOrder(orderId: string): Promise<ServiceResponse> {
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

  async newOrderFromCart(userId: string, data: CreateOrderInput['body'], cart: any): Promise<ServiceResponse> {
    //ساخت سفارش جدید و خالی کردن سبد خرید
    const productsReadyToPay: any[] = [];
    const transactionResult = await withTransaction(async (session: mongoose.mongo.ClientSession) => {
      for (let item of cart.reservedProducts) {
        if (item.selectedPropertyvalString === '') {
          const updateOp = await Product.findOneAndUpdate(
            {
              _id: item.productId,
              stock: { $gte: item.count },
            },
            { $inc: { stock: -item.count } },
            { session },
          )
            .populate({
              path: 'properties.property',
              model: 'Property',
            })
            .populate({
              path: 'properties.values.propertyval',
              model: 'Propertyval',
            });

          if (!updateOp) {
            throw new Error('Insufficient stock');
          }
          const { price, discount } = getPriceAndStock(item.selectedPropertyvalString, updateOp);

          const orderProduct = {
            productId: updateOp._id,
            name: updateOp.name,
            price: price,
            discount: discount,
            properties: updateOp.properties,
            count: item.count,
            selectedPropertyvalString: '',
            selectedPropertyval: '',
          };
          productsReadyToPay.push(orderProduct);
        } else {
          const findOp = await Propertyval.findOne(
            {
              _id: item.selectedPropertyvalString,
            },
            null,
            { session },
          );
          if (!findOp) {
            throw new Error('selected propertyval not founded');
          }
          const updateOp = await Product.findOneAndUpdate(
            {
              _id: item.productId,
            },
            { $inc: { 'properties.$[prop].values.$[val].stock': -item.count } },
            {
              arrayFilters: [
                { 'prop.selective': true },
                {
                  'val.propertyval': item.selectedPropertyvalString,
                  'val.stock': { $gte: item.count },
                },
              ],
              session,
            },
          )
            .populate({ path: 'properties.property', model: 'Property' })
            .populate({
              path: 'properties.values.propertyval',
              model: 'Propertyval',
            });

          if (!updateOp) {
            throw new Error('Insufficient stock');
          }
          const { price, discount } = getPriceAndStock(item.selectedPropertyvalString, updateOp);

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
        userId: userId,
        products: productsReadyToPay,
        status: 'canceled',
        pendingExpire: null,
        totalPrice: totalPrice,
        authority: '',
        authExpire: null,
        referenceId: '',
        receiver: {
          name: data.name,
          phone: data.phone,
          province: data.province,
          city: data.city,
          address: data.address,
          postalCode: data.postalCode,
          note: data.note,
        },
      });

      cart.reservedProducts = [];
      await cart.save({ session });
      const saveOp = await newOrder.save({ session });
      return serviceResponse(200, saveOp);
    });
    return transactionResult;
  },
};
