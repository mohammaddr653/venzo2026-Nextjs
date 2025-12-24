import { isAdmin, isLoggedIn, verified } from '#src/middlewares/auth.js';
import { Router } from 'express';
import { propertyController } from './property.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { createPropertySchema, seeOnePropertySchema, updatePropertySchema } from './property.schema.js';

const router = Router();

//admin

router.use(isLoggedIn, verified, isAdmin);

router.get('/', propertyController.getProperties);

router.get('/:propertyId', validate(seeOnePropertySchema), propertyController.seeOneProperty);

router.get('/withvals', propertyController.getPropertiesWithVals);

router.post('/', validate(createPropertySchema), propertyController.createProperty);

router.put('/:propertyId', validate(updatePropertySchema), propertyController.updateProperty);

router.delete('/:propertyId', validate(seeOnePropertySchema), propertyController.deleteProperty);

export default router;
