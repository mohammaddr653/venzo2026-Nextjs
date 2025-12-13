import uploadHandler from '#src/helpers/uploadHandler.js';
import compressor from '#src/middlewares/compressor.js';
import fileToReqBodyHandler from '#src/middlewares/fileToReqBody.js';
import { Router } from 'express';
import { createMediaSchema } from './media.schema.js';
import { validate } from '#src/middlewares/validate.js';
import { mediaController } from './media.controller.js';
const router = Router();

//admin
router.post(
  '/',
  uploadHandler('media', /jpeg|jpg|png|webp/, true, 1000),
  compressor('./uploads/medias', true),
  fileToReqBodyHandler('media', true),
  validate(createMediaSchema),
  mediaController.createMedia
);

export default router;
