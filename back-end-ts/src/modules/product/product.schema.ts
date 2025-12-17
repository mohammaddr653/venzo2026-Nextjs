import mongoose from 'mongoose';
import z from 'zod';

export const getMostProductsSchema = z.object({
  query: z.object({ type: z.enum(['newest', 'offers']) }),
});

export const getProductsByCategorySchema = z.object({
  //note: I must send the attributes in req.body . this method needs to change
  query: z.object({ limit: z.string().optional(), page: z.string().optional(), attributes: z.any().optional() }),
  params: z.object({
    categoryString: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'رشته دسته بندی نامعتبر'),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'نام محصول را انتخاب کنید'),
    price: z.string().min(1, 'قیمت محصول را تعیین کنید'),
    discount: z.object({ offer: z.string(), startedAt: z.string(), expiredAt: z.string() }).nullable(),
    stock: z.string().min(1, 'موجودی انبار را تعیین کنید'),
    categoryId: z.string(),
    description: z.string(),
    properties: z.array(
      z.object({
        property: z.object({
          _id: z.string(),
          name: z.string(),
          specifiedVals: z.boolean(),
          type: z.string(),
        }),

        selective: z.boolean(),

        values: z.array(
          z.object({
            propertyval: z
              .object({
                _id: z.string(),
                value: z.string(),
                hex: z.string().optional(),
              })
              .optional(),
            valueString: z.string().optional(),

            price: z.string().optional(),

            discount: z.object({ offer: z.string(), startedAt: z.string(), expiredAt: z.string() }).optional().nullable(),

            stock: z.string().optional(),
          }),
        ),
      }),
    ),
    img: z.string().nullable(),
    gallery: z.array(z.string()).nullable(),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type GetMostProductsInput = z.infer<typeof getMostProductsSchema>;

export type GetProductsByCategoryInput = z.infer<typeof getProductsByCategorySchema>;
