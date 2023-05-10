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
  "target_area" text NOT NULL
);

CREATE TABLE "exercises" (
  "id" SERIAL PRIMARY KEY,
  "workout_id" integer NOT NULL,
  "exercise_number" integer,
  "exercise_name" text NOT NULL,
  "duration_minutes" integer,
  "duration_seconds" integer,
  "weight" integer,
  "reps" integer,
  "sets" integer
);

ALTER TABLE "workouts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workouts" ADD FOREIGN KEY ("video_id") REFERENCES "videos" ("id");

ALTER TABLE "exercises" ADD FOREIGN KEY ("workout_id") REFERENCES "workouts" ("id");
