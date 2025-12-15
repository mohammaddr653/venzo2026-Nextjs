import z from 'zod';

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
