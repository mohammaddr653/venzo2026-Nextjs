import mongoose from 'mongoose';
import z from 'zod';

export const oneCategorySchema = z.object({
  params: z.object({
    categoryId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی نامعتبر'),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'نام دسته بندی را انتخاب کنید'),
    motherId: z.string(),
    type: z.enum(['link', 'shop', 'archive', 'box']),
    link: z.string(),
    img: z.string(),
    display: z.enum(['mega-menu', 'ordinary']),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    categoryId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی نامعتبر'),
  }),
  body: z.object({
    name: z.string().min(1, 'نام دسته بندی را انتخاب کنید'),
    motherId: z.string(),
    type: z.enum(['link', 'shop', 'archive', 'box']),
    link: z.string(),
    img: z.string(),
    display: z.enum(['mega-menu', 'ordinary']),
  }),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type OneCategoryInput = z.infer<typeof oneCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
