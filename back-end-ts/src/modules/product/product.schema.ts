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

export const getFiltersSchema = z.object({
  params: z.object({
    categoryString: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'رشته دسته بندی نامعتبر'),
  }),
});

export const getSingleProductSchema = z.object({
  params: z.object({
    productId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی محصول نامعتبر'),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'نام محصول را انتخاب کنید'),
    price: z.number().min(0, 'قیمت محصول را تعیین کنید'),
    discount: z.object({ offer: z.number(), startedAt: z.date().nullable(), expiredAt: z.date().nullable() }).nullable(),
    stock: z.number().min(0, 'موجودی محصول را تعیین کنید'),
    categoryId: z.string(),
    description: z.string(),
    properties: z.array(
      z.object({
        property: z.string(),

        selective: z.boolean(),

        values: z.array(
          z.object({
            propertyval: z.string().optional(),
            valueString: z.string().optional(),

            price: z.number().min(0, 'قیمت ویژگی انتخابی را تعیین کنید').optional(),

            discount: z.object({ offer: z.number(), startedAt: z.date().nullable(), expiredAt: z.date().nullable() }).optional().nullable(),

            stock: z.number().min(0, 'موجودی ویژگی انتخابی را تعیین کنید').optional(),
          }),
        ),
      }),
    ),
    img: z.string().nullable(),
    gallery: z.array(z.string()).nullable(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    productId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی محصول نامعتبر'),
  }),

  body: z.object({
    name: z.string().min(1, 'نام محصول را انتخاب کنید'),
    price: z.number().min(0, 'قیمت محصول را تعیین کنید'),
    discount: z.object({ offer: z.number(), startedAt: z.date().nullable(), expiredAt: z.date().nullable() }).nullable(),
    stock: z.number().min(0, 'موجودی محصول را تعیین کنید'),
    categoryId: z.string(),
    description: z.string(),
    properties: z.array(
      z.object({
        property: z.string(),

        selective: z.boolean(),

        values: z.array(
          z.object({
            propertyval: z.string().optional(),
            valueString: z.string().optional(),

            price: z.number().min(0, 'قیمت ویژگی انتخابی را تعیین کنید').optional(),

            discount: z.object({ offer: z.number(), startedAt: z.date().nullable(), expiredAt: z.date().nullable() }).optional().nullable(),

            stock: z.number().min(0, 'موجودی ویژگی انتخابی را تعیین کنید').optional(),
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
export type GetFiltersInput = z.infer<typeof getFiltersSchema>;
export type GetSingleProductInput = z.infer<typeof getSingleProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
