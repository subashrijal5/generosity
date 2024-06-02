CREATE TABLE IF NOT EXISTS "student_lectures" (
	"id" serial PRIMARY KEY NOT NULL,
	"lecture_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"status" varchar(10) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_lectures" ADD CONSTRAINT "student_lectures_lecture_id_lectures_id_fk" FOREIGN KEY ("lecture_id") REFERENCES "public"."lectures"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_lectures" ADD CONSTRAINT "student_lectures_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
