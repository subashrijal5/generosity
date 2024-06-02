CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150),
	"description" text,
	"credits" serial NOT NULL,
	"semester" varchar(10),
	"timeslot" varchar(10),
	"instructor_id" serial NOT NULL,
	"credit" integer,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"course_id" serial NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instructors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150),
	"email" varchar(150),
	"designation" varchar(100),
	"bio" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "instructors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150),
	"email" varchar(150),
	"password" varchar(100),
	"role" varchar(10),
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
