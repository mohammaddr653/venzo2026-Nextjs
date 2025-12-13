import { Router } from 'express';
import authRoutes from '#src/modules/auth/auth.route.js';
import userRouter from '#src/modules/user/user.route.js';
import categoriesRouter from '#src/modules/category/category.route.js';
import mediaRouter from '#src/modules/media/media.route.js';

const router = Router();

import { isAdmin, isLoggedIn, notLoggedIn, setReqUser, verified } from '#src/middlewares/auth.js';

router.use(setReqUser); //set the req.user value

router.use('/auth', notLoggedIn, authRoutes);
router.use('/user', isLoggedIn, verified, userRouter);
router.use('/categories', categoriesRouter);
router.use('/medias', isLoggedIn, verified, isAdmin, mediaRouter);

export default router;
