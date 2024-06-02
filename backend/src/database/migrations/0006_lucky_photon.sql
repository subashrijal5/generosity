ALTER TABLE "courses" ALTER COLUMN "timeslot" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "lecture_days" varchar(100) NOT NULL;