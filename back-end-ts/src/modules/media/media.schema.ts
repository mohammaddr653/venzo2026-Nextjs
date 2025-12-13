import mongoose from 'mongoose';
import z from 'zod';

export const oneMediaSchema = z.object({
  params: z.object({
    mediaId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی نامعتبر'),
  }),
});

export const createMediaSchema = z.object({
  body: z.object({
    media: z.array(z.object()),
  }),
});

export const updateMediaSchema = z.object({
  params: z.object({
    mediaId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی نامعتبر'),
  }),
  body: z.object({
    media: z.object(),
  }),
});

export type OneMediaInput = z.infer<typeof oneMediaSchema>;
export type CreateMediaInput = z.infer<typeof createMediaSchema>;
export type UpdateMediaInput = z.infer<typeof updateMediaSchema>;
