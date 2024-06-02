ALTER TABLE "enrollments" RENAME COLUMN "created_at" TO "completed_at";--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "completed_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "enrolled_at" timestamp DEFAULT now();