ALTER TABLE "courses" DROP CONSTRAINT "courses_instructor_id_instructors_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "lectures" DROP CONSTRAINT "lectures_course_id_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP CONSTRAINT "refreshTokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "student_lectures" DROP CONSTRAINT "student_lectures_lecture_id_lectures_id_fk";
--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "lecture_days" DROP DEFAULT;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lectures" ADD CONSTRAINT "lectures_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_lectures" ADD CONSTRAINT "student_lectures_lecture_id_lectures_id_fk" FOREIGN KEY ("lecture_id") REFERENCES "public"."lectures"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "lectures" DROP COLUMN IF EXISTS "status";