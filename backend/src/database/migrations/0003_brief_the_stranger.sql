ALTER TABLE "courses" ALTER COLUMN "credits" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN IF EXISTS "credit";