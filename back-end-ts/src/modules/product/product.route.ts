import { Router } from 'express';
import {
  createProductSchema,
  getFiltersSchema,
  getMostProductsSchema,
  getProductsByCategorySchema,
  getSingleProductSchema,
  updateProductSchema,
} from './product.schema.js';
import { validate } from '#src/middlewares/validate.js';
import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';
import { productController } from './product.controller.js';

const router = Router();

router.get('/', productController.getProducts);
router.get('/most-products', validate(getMostProductsSchema), productController.getMostProducts);
router.get('/:categoryString', validate(getProductsByCategorySchema), productController.getShopByCategory);
router.get('/filters/:categoryString', validate(getFiltersSchema), productController.getFiltersByCategory);
router.get('/withProperties/:productId', validate(getSingleProductSchema), productController.getSingleShopWithProperties);
router.get('/single/:productId', validate(getSingleProductSchema), productController.getSingleShop);

//admin
router.use(isLoggedIn, verified, isAdmin);

router.post('/', validate(createProductSchema), productController.createProduct);

router.put('/:productId', validate(updateProductSchema), productController.updateProduct);

export default router;
