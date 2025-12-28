import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Cart from '#src/models/cart.js';

export const cartServices = {
  async seeOneCart(userId: string): Promise<ServiceResponse> {
    // خواندن یک سبد خرید از دیتابیس
    const findOp = await Cart.findOne({ userId: userId });
    return serviceResponse(200, findOp);
  },
};
