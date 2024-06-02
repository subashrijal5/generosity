import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export const lectureSchema = z.object({
  id: z.number(),
  name: commonValidations.name,
  description: commonValidations.description,
  courseId: z.number(),
  createdAt: commonValidations.createdAt,
  updatedAt: commonValidations.updatedAt,
});

export type Lecture = z.infer<typeof lectureSchema> & {
  studentLectures?: StudentLecture[];
};

export const studentLectureSchema = z.object({
  id: z.number(),
  lectureId: z.number(),
  userId: z.number(),
  status: z.enum(['completed', 'pending', 'missed']),
  createdAt: commonValidations.createdAt,
  updatedAt: commonValidations.updatedAt,
});
export type StudentLecture = z.infer<typeof studentLectureSchema>;

export const updateLectureStatusSchema = z.object({
  body: z.object({
    status: studentLectureSchema.shape.status,
  }),
});
