import { Router } from 'express';
import { oneUserSchema, updateAvatarSchema, updateProfileSchema } from './user.schema.js';
import { validate } from '#src/middlewares/validate.js';
import { userController } from './user.controller.js';
import fileToReqBodyHandler from '#src/middlewares/fileToReqBody.js';
import compressor from '#src/middlewares/compressor.js';
import uploadHandler from '#src/helpers/uploadHandler.js';
import { isAdmin } from '#src/middlewares/auth.js';

const router = Router();

router.put('/', validate(updateProfileSchema), userController.updateProfile);
router.post(
  '/avatar',
  uploadHandler('avatar', /jpeg|jpg|png/, false, 1),
  compressor('./uploads/avatars', true),
  fileToReqBodyHandler('avatar', false),
  validate(updateAvatarSchema),
  userController.addAvatar,
);
router.delete('/avatar', userController.deleteAvatar);

//admin
router.use(isAdmin);
router.get('/all', userController.getUsers);
router.get('/:userId', validate(oneUserSchema), userController.seeOneUser);

// router.get('/v1/users/', userController.getAllUsers);
// router.get('/v1/users/:id', validate(getUserByIdSchema), userController.getUserById);
// router.post('/v1/users/', validate(createUserSchema), userController.createUser);
// router.delete('/v1/users/:id', validate(deleteUserSchema), userController.deleteUser);

export default router;
