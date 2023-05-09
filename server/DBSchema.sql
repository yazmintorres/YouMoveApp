CREATE TABLE "users" (
  "id" text PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL
);

CREATE TABLE "videos" (
  "id" serial PRIMARY KEY,
  "sourceId" text,
  "etag" text,
  "title" text,
  "channelTitle" text,
  "thumbnailUrl" text
);

CREATE TABLE "workouts" (
  "id" serial PRIMARY KEY,
  "userId" text NOT NULL,
  "videoId" integer NOT NULL,
  "targetArea" text NOT NULL
);

CREATE TABLE "exercises" (
  "id" serial PRIMARY KEY,
  "workoutId" integer NOT NULL,
  "exerciseNumber" integer,
  "exerciseName" text NOT NULL,
  "durationMinutes" integer,
  "durationSeconds" integer,
  "weight" integer,
  "reps" integer,
  "sets" integer
);

ALTER TABLE "workouts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "workouts" ADD FOREIGN KEY ("videoId") REFERENCES "videos" ("id");

ALTER TABLE "exercises" ADD FOREIGN KEY ("workoutId") REFERENCES "workouts" ("id");
