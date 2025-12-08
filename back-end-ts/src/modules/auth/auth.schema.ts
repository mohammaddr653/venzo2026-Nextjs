import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'نام حداقل باید 2 حرف باشد').max(50),
    email: z.email('ایمیل معتبر نیست'),
    password: z.string().min(8, 'رمز عبور حداقل باید 8 کارکتر باشد'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email('ایمیل معتبر نیست'),
    password: z.string(),
  }),
});

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;
