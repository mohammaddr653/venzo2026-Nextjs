import mongoose from 'mongoose';
import z from 'zod';

export const createPropertySchema = z.object({
  body: z.object({ name: z.string(), specifiedVals: z.boolean(), type: z.enum(['oridnary', 'color']) }),
});

export const updatePropertySchema = z.object({
  params: z.object({
    propertyId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی محصول نامعتبر'),
  }),
  body: z.object({ name: z.string(), specifiedVals: z.boolean(), type: z.enum(['oridnary', 'color']) }),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
