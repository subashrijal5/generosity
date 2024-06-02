import { sql } from 'drizzle-orm';

import { db } from '@/database/connection';
import { studentLectures } from '@/database/schema';

import { StudentLecture } from './lecturesModel';

export const lectureRepository = {
  updateStatus: async (lectureId: number, userId: number, status: StudentLecture['status']) => {
    const studentLecture = await lectureRepository.findByUserLectureId(userId, lectureId);
    if (studentLecture) {
      await db
        .update(studentLectures)
        .set({
          status,
          updatedAt: new Date(),
        })
        .where(sql`user_id = ${userId} AND lecture_id = ${lectureId}`);
      return;
    }
    await db.insert(studentLectures).values({
      status,
      lectureId: lectureId,
      userId: userId,
      updatedAt: new Date(),
    });
    // Sadly postgresql doesn't support this
    // .onConflictDoUpdate({
    //     target: studentLectures.lectureId,
    //     targetWhere: sql`lecture_id = ${lectureId} AND user_id = ${userId}`,
    //     set: { status, updatedAt: new Date() },
    //   })
  },

  findByUserLectureId: async (userId: number, lectureId: number) => {
    return await db.query.studentLectures.findFirst({
      where: sql`user_id = ${userId} AND lecture_id = ${lectureId}`,
    });
  },
};
