import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { registerSchema } from './auth.schema.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);

export default router;
