import { Router } from 'express';
import authRoutes from '#src/modules/auth/auth.route.js';

const router = Router();

import { isLoggedIn, isAdmin, notLoggedIn, setReqUser, notVerified, verified } from '#src/middlewares/auth.js';
router.use(setReqUser); //set the req.user value

router.use('/auth', notLoggedIn, authRoutes);

export default router;
