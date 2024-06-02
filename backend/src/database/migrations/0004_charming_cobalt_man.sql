CREATE TABLE IF NOT EXISTS "lectures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"course_id" serial NOT NULL,
	"status" varchar(10) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "status" varchar(10) DEFAULT 'enrolled' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lectures" ADD CONSTRAINT "lectures_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
