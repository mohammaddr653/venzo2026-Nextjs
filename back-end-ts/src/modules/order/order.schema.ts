import mongoose from 'mongoose';
import z from 'zod';

export const oneOrderSchema = z.object({
  params: z.object({
    orderId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی سفارش نامعتبر'),
  }),
});

export const createOrderSchema = z.object({
  body: z.object({
    products: z.any(),
    status: z.enum(['expired', 'canceled', 'pending', 'check', 'paid']),
    name: z.string(),
    phone: z.string(),
    province: z.string(),
    city: z.string(),
    address: z.string(),
    postalCode: z.string(),
    note: z.string(),
  }),
});

export type OneOrderInput = z.infer<typeof oneOrderSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
