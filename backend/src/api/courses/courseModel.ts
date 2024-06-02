import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { SemesterEnum } from '@/common/enums/enum';
import { commonValidations } from '@/common/utils/commonValidation';

import { Enrollment } from '../enrollments/enrollmentModel';
import { Instructor } from '../instructors/instructorModel';
import { Lecture } from '../lectures/lecturesModel';

extendZodWithOpenApi(z);

export const courseSchema = z.object({
  id: z.number(),
  name: commonValidations.name,
  description: commonValidations.description,
  credits: z.number(),
  semester: z.nativeEnum(SemesterEnum),
  timeslot: z.string(),
  lectureDays: z.string(),
  instructorId: z.number(),
  createdAt: commonValidations.createdAt,
  updatedAt: commonValidations.updatedAt,
});

export type Course = z.infer<typeof courseSchema> & {
  instructor?: Instructor;
  enrollments?: Enrollment[];
  lectures?: Lecture[];
};

export const courseCreateSchema = z.object({
  body: courseSchema.omit({ id: true, createdAt: true, updatedAt: true }),
});

export type TCreateCourse = z.infer<typeof courseCreateSchema>;
