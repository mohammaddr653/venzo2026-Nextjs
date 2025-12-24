import mongoose from 'mongoose';
import z from 'zod';

export const seeOnePropertyvalSchema = z.object({
  params: z.object({
    propertyvalId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی مقدار ویژگی نامعتبر'),
  }),
});

export const propertyvalByIdSchema = z.object({
  params: z.object({
    propertyId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی ویژگی نامعتبر'),
  }),
});

export const createPropertyvalSchema = z.object({
  body: z.object({
    propertyId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی ویژگی نامعتبر'),
    value: z.string(),
    hex: z.string().optional(),
  }),
});

export type SeeOnePropertyvalInput = z.infer<typeof seeOnePropertyvalSchema>;
export type PropertyvalByIdInput = z.infer<typeof propertyvalByIdSchema>;
export type CreatePropertyvalInput = z.infer<typeof createPropertyvalSchema>;
