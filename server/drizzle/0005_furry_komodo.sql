CREATE TABLE IF NOT EXISTS "comments" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"postId" varchar(255) NOT NULL,
	"authorId" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP INDEX IF EXISTS "userIdIdx";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
