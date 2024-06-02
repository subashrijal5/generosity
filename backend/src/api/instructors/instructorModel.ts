import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export const instructorSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(150),
  email: z.string().email(),
  designation: z.string().min(3).max(100),
  bio: z.string().min(3).max(500),
  createdAt: commonValidations.createdAt,
  updatedAt: commonValidations.updatedAt,
});

export type Instructor = z.infer<typeof instructorSchema>;
