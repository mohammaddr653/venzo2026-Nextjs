import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { loginSchema, registerSchema } from './auth.schema.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;
