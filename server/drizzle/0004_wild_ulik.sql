ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_users_id_fk";
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userIdIdx" ON "posts" ("authorId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
