import z from 'zod';

export const createMediaSchema = z.object({
  body: z.object({
    media: z.array(z.object()),
  }),
});

export type CreateMediaInput = z.infer<typeof createMediaSchema>;
