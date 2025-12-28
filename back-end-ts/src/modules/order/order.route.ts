import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';
import { Router } from 'express';
import { orderController } from './order.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { createOrderSchema, oneOrderSchema } from './order.schema.js';
const router = Router();

router.use(isLoggedIn, verified);
router.post('/', validate(createOrderSchema), orderController.createOrderFromCart);

//admin

router.use(isAdmin);

router.get('/', orderController.getAllOrders);

router.delete('/:orderId', validate(oneOrderSchema), orderController.exOrder);

export default router;
