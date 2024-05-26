import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .min(6, { message: "Password can't be less then 6 characters" })
    .optional(),
});

export const userValidation = userValidationSchema;
