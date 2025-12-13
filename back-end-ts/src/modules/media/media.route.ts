import uploadHandler from '#src/helpers/uploadHandler.js';
import compressor from '#src/middlewares/compressor.js';
import fileToReqBodyHandler from '#src/middlewares/fileToReqBody.js';
import { Router } from 'express';
import { createMediaSchema, oneMediaSchema } from './media.schema.js';
import { validate } from '#src/middlewares/validate.js';
import { mediaController } from './media.controller.js';
const router = Router();

//admin
router.get('/', mediaController.getMedias);
router.get('/:mediaId', validate(oneMediaSchema), mediaController.seeOneMedia);
router.post(
  '/',
  uploadHandler('media', /jpeg|jpg|png|webp/, true, 1000),
  compressor('./uploads/medias', true),
  fileToReqBodyHandler('media', true),
  validate(createMediaSchema),
  mediaController.createMedia,
);

export default router;
