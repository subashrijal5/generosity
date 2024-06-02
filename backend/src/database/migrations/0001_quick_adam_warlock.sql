CREATE TABLE IF NOT EXISTS "refreshTokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" serial NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "semester" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "timeslot" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "credit" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "instructors" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "instructors" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "instructors" ALTER COLUMN "designation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "instructors" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
