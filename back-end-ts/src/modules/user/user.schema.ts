import mongoose from 'mongoose';
import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'نام حداقل باید 2 کارکتر باشد').max(50),
    email: z.email('ایمیل نامعتبر است'),
    password: z.string().min(8, 'رمز عبور حداقل باید 8 کارکتر باشد'),
  }),
});

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.uuid('آیدی نامعتبر'),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'نام حداقل باید 2 کارکتر باشد').max(50),
  }),
});

export const updateAvatarSchema = z.object({
  body: z.object({
    avatar: z.object(),
  }),
});

export const oneUserSchema = z.object({
  params: z.object({
    userId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی نامعتبر'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی نامعتبر'),
  }),
  body: z.object({
    name: z.string().min(2, 'نام حداقل باید 2 کارکتر باشد').max(50),
    email: z.email('ایمیل نامعتبر است'),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    userId: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), 'آیدی نامعتبر'),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateAvatarInput = z.infer<typeof updateAvatarSchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
export type OneUserInput = z.infer<typeof oneUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
