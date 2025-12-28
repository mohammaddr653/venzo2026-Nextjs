import response from '#src/helpers/controllerResponse.js';
import { Request, Response } from 'express';
import { orderServices } from '#src/services/order.service.js';
import { CreateOrderInput, OneOrderInput } from './order.schema.js';
import { cartServices } from '#src/services/cart.service.js';

export const orderController = {
  async getAllOrders(_req: Request, res: Response) {
    const result = await orderServices.seeAllOrders();
    return response({
      res,
      message: 'لیست تمام سفارشات فروشگاه',
      data: result.data,
    });
  },

  async exOrder(req: Request<OneOrderInput['params']>, res: Response) {
    const result = await orderServices.expireOrder(req.params.orderId);
    if (result.status === 200)
      return response({
        res,
        message: 'سفارش با موفقیت منقضی شد',
      });

    if (result.status === 409)
      return response({
        res,
        message: 'منقضی کردن سفارشات تکمیل شده یا در حال پرداخت غیر ممکن است',
        code: result.status,
      });

    throw new Error('something went wrong');
  },

  async createOrderFromCart(req: Request<{}, {}, CreateOrderInput['body']>, res: Response) {
    const { data: cart } = await cartServices.seeOneCart(req.user?._id as unknown as string);
    const result = await orderServices.newOrderFromCart(req.user?._id as unknown as string, req.body, cart);
    return response({
      res,
      message: 'new order created , here is the order id',
      data: result.data._id,
    });
  },
};
