import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const enrollmentSchema = z.object({
  id: z.number(),
  courseId: z.number(),
  userId: z.number(),
  status: z.enum(['enrolled', 'completed', 'cancelled']),
  enrolledAt: commonValidations.createdAt,
  completedAt: commonValidations.updatedAt,
  updatedAt: commonValidations.updatedAt,
});

export type Enrollment = z.infer<typeof enrollmentSchema>;
