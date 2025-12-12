import { Router } from 'express';
import { createCategorySchema } from './category.schema.js';
import { categoryController } from './category.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';

const router = Router();

//admin
router.use(isLoggedIn, verified, isAdmin);
router.post('/', validate(createCategorySchema), categoryController.createCategory);

export default router;
