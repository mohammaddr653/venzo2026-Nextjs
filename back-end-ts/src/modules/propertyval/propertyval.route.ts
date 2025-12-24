import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';
import { Router } from 'express';
import { propertyvalController } from './propertyval.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { createPropertyvalSchema, propertyvalByIdSchema, seeOnePropertyvalSchema, updatePropertyvalSchema } from './propertyval.schema.js';
const router = Router();

//admin

router.use(isLoggedIn, verified, isAdmin);

router.get('/', propertyvalController.getPropertyvals);

router.get('/filter/:propertyId', validate(propertyvalByIdSchema), propertyvalController.getPropertyvalsById);

router.get('/:propertyvalId', validate(seeOnePropertyvalSchema), propertyvalController.seeOnePropertyval);

router.post('/', validate(createPropertyvalSchema), propertyvalController.createPropertyval);

router.put('/:propertyvalId', validate(updatePropertyvalSchema), propertyvalController.updatePropertyval);

router.delete('/:propertyvalId', validate(seeOnePropertyvalSchema), propertyvalController.deletePropertyval);

export default router;
