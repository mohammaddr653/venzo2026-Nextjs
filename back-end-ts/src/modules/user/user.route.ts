import { Router } from 'express';
import { updateProfileSchema } from './user.schema.js';
import { validate } from '#src/middlewares/validate.js';
import { userController } from './user.controller.js';

const router = Router();

router.put('/', validate(updateProfileSchema), userController.updateProfile);

// router.get('/v1/users/', userController.getAllUsers);
// router.get('/v1/users/:id', validate(getUserByIdSchema), userController.getUserById);
// router.post('/v1/users/', validate(createUserSchema), userController.createUser);
// router.delete('/v1/users/:id', validate(deleteUserSchema), userController.deleteUser);

export default router;
