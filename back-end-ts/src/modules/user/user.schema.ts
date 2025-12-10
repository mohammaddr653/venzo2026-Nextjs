import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'نام حداقل باید 2 کارکتر باشد').max(50),
    email: z.email('Invalid email address'),
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

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.uuid('آیدی نامعتبر'),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
