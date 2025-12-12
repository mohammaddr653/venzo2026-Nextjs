import z from 'zod';

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

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
