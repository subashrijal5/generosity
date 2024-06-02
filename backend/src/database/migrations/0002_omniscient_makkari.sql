ALTER TABLE "refreshTokens" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP COLUMN IF EXISTS "expiresAt";