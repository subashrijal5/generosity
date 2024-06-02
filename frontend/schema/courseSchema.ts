import type { EnrollmentStatus, SemesterEnum, WeekDaysEnum } from "~/enums/common";

export type TCourse = {
  id: number;
  name: string;
  description: string;
  credits: number;
  semester: SemesterEnum;
  timeslot: string;
  lectureDays: string;
  instructorId: number;
  instructor: TInstructor;
  enrollments: Enrollment[];
  lectures: Lecture[];
  createdAt: string;
  updatedAt: string | null;
  days?: WeekDaysEnum[]
};

export type TInstructor = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  designation: string;
  bio: string;
};

export type Enrollment = {
  id: number;
  courseId: number;
  userId: number;
  enrolledAt: string;
  status: EnrollmentStatus;
  completedAt: string | null;
};
export type Lecture = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: number;
  studentLectures?: StudentLecture[];
};

export type StudentLecture = {
  id: number;
  status: "completed" | "pending" | "missed";
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  lectureId: number;
};
