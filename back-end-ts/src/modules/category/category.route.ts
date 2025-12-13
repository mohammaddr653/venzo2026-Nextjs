import { Router } from 'express';
import { createCategorySchema, oneCategorySchema, updateCategorySchema } from './category.schema.js';
import { categoryController } from './category.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';

const router = Router();

router.get('/', categoryController.getCategories);

//admin
router.use(isLoggedIn, verified, isAdmin);

router.get('/:categoryId', validate(oneCategorySchema), categoryController.seeOneCategory);
router.post('/', validate(createCategorySchema), categoryController.createCategory);
router.put('/:categoryId', validate(updateCategorySchema), categoryController.updateCategory);
router.delete('/:categoryId', validate(oneCategorySchema), categoryController.deleteCategory);

export default router;
