CREATE TABLE "users" (
  "id" text PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL
);

CREATE TABLE "videos" (
  "id" text PRIMARY KEY,
  "etag" text,
  "title" text,
  "channel_title" text,
  "thumbnail_url" text
);

CREATE TABLE "workouts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" text NOT NULL,
  "video_id" text NOT NULL,
  "target_area" text NOT NULL,
  "exercises" json [] NOT NULL
);

ALTER TABLE "workouts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workouts" ADD FOREIGN KEY ("video_id") REFERENCES "videos" ("id");
