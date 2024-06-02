import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string(),
  description: z.string().min(10),

  createdAt: z.date(),
  updatedAt: z.date().optional(),
};
