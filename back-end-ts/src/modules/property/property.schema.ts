import z from 'zod';

export const createPropertySchema = z.object({
  body: z.object({ name: z.string(), specifiedVals: z.boolean(), type: z.enum(['oridnary', 'color']) }),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
