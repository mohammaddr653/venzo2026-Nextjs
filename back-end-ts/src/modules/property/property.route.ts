import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';
import { Router } from 'express';
import { propertyController } from './property.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { createPropertySchema, updatePropertySchema } from './property.schema.js';

const router = Router();

//admin

router.use(isLoggedIn, verified, isAdmin);

router.post('/', validate(createPropertySchema), propertyController.createProperty);

router.put('/:propertyId', validate(updatePropertySchema), propertyController.updateProperty);


export default router;
