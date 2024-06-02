import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 150 }).unique().notNull(),
  password: varchar('password', { length: 100 }).notNull(),
  role: varchar('role', { length: 10 }).$type<'admin' | 'student'>().notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
});

export const userRelations = relations(users, ({ many }) => {
  return {
    enrollments: many(enrollments),
  };
});

export const instructors = pgTable('instructors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 150 }).unique().notNull(),
  designation: varchar('designation', { length: 100 }).notNull(),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  description: text('description'),
  credits: integer('credits').notNull(),
  semester: varchar('semester', { length: 10 }).$type<'first' | 'second'>().notNull(),
  timeslot: varchar('timeslot', { length: 100 }).notNull(), // comma separated list of timeslots
  lectureDays: varchar('lecture_days', { length: 100 }).notNull(), // comma separated list of days
  instructorId: serial('instructor_id')
    .references(() => instructors.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const coursesRelations = relations(courses, ({ one, many }) => {
  return {
    instructor: one(instructors, { fields: [courses.instructorId], references: [instructors.id] }),
    enrollments: many(enrollments),
    lectures: many(lectures),
  };
});

export const lectures = pgTable('lectures', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  description: text('description'),
  courseId: serial('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const lecturesRelations = relations(lectures, ({ one, many }) => {
  return {
    course: one(courses, { fields: [lectures.courseId], references: [courses.id] }),
    studentLectures: many(studentLectures),
  };
});

export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  userId: serial('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  courseId: serial('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  status: varchar('status', { length: 10 }).notNull().default('enrolled'), // enrolled | completed | cancelled
  enrolledAt: timestamp('enrolled_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  updatedAt: timestamp('updated_at'),
});

export const enrollmentsRelations = relations(enrollments, ({ one }) => {
  return {
    instructor: one(instructors, { fields: [enrollments.courseId], references: [instructors.id] }),
    user: one(users, { fields: [enrollments.userId], references: [users.id] }),
    course: one(courses, { fields: [enrollments.courseId], references: [courses.id] }),
  };
});

export const studentLectures = pgTable(
  'student_lectures',
  {
    id: serial('id').primaryKey(),
    lectureId: serial('lecture_id')
      .references(() => lectures.id, { onDelete: 'cascade' })
      .notNull(),
    userId: serial('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    status: varchar('status', { length: 10 }).notNull().default('pending'), // pending, completed, missed
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
  },
  (t) => ({
    unique: unique().on(t.lectureId, t.userId),
  })
);

export const studentLecturesRelations = relations(studentLectures, ({ one }) => {
  return {
    lecture: one(lectures, { fields: [studentLectures.lectureId], references: [lectures.id] }),
    user: one(users, { fields: [studentLectures.userId], references: [users.id] }),
  };
});

export const refreshTokens = pgTable('refreshTokens', {
  id: serial('id').primaryKey(),
  token: text('token').notNull(),
  userId: serial('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});
