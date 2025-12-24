import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';
import { Router } from 'express';
import { propertyvalController } from './propertyval.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { createPropertyvalSchema, propertyvalByIdSchema } from './propertyval.schema.js';
const router = Router();

//admin

router.use(isLoggedIn, verified, isAdmin);

router.get('/', propertyvalController.getPropertyvals);

router.get('/filter/:propertyId', validate(propertyvalByIdSchema), propertyvalController.getPropertyvalsById);

router.post('/', validate(createPropertyvalSchema), propertyvalController.createPropertyval);

export default router;
