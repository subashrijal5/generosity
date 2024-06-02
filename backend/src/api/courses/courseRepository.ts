import { sql } from 'drizzle-orm';

import { db } from '@/database/connection';
import { enrollments } from '@/database/schema';

import { Course } from './courseModel';

export const courseRepository = {
  findAllAsync: async (userId: number): Promise<Course[]> => {
    return (await db.query.courses.findMany({
      with: {
        enrollments: {
          where: sql`user_id = ${userId}`,
        },
        instructor: true,
      },
    })) as Course[];
  },

  find: async (id: number, userId: number): Promise<Course | null> => {
    return (await db.query.courses.findFirst({
      where: sql`id = ${id}`,
      with: {
        enrollments: {
          where: sql`user_id = ${userId}`,
        },
        instructor: true,
        lectures: {
          with: {
            studentLectures: {
              where: sql`user_id = ${userId}`,
            },
          },
        },
      },
    })) as Course | null;
  },

  enroll: async (courseId: number, userId: number): Promise<void> => {
    await db.insert(enrollments).values({ courseId: courseId, userId: userId, enrolledAt: new Date() });
  },

  leave: async (courseId: number, userId: number): Promise<void> => {
    await db.delete(enrollments).where(sql`course_id = ${courseId} AND user_id = ${userId}`);
  },

  isUserEnroll: async (courseId: number, userId: number): Promise<boolean> => {
    const enrollment = await db.query.enrollments.findFirst({
      where: sql`course_id = ${courseId} AND user_id = ${userId}`,
    });
    return !!enrollment;
  },

  getUserCourses: async (userId: number): Promise<Course[]> => {
    const response = await db.query.enrollments.findMany({
      where: sql`user_id = ${userId}`,
      with: {
        course: {
          with: {
            instructor: true,
            lectures: true,
            enrollments: true,
          },
        },
      },
    });

    const courses = response.map((res) => res.course);
    return courses as Course[];
  },

  markCompleted: async (courseId: number, userId: number): Promise<void> => {
    await db
      .update(enrollments)
      .set({ status: 'completed', completedAt: new Date() })
      .where(sql`course_id = ${courseId} AND user_id = ${userId}`);
  },
};
