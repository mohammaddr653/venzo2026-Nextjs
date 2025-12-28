import mongoose from 'mongoose';
import z from 'zod';

export const oneOrderSchema = z.object({
  params: z.object({
    orderId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی سفارش نامعتبر'),
  }),
});

export type OneOrderInput = z.infer<typeof oneOrderSchema>;
