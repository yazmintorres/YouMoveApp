const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const addVideo = require("./addVideo.js");
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// app.get("/*", (req, res) => {
//   try {
//     res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// add new user to DB
app.post("/api/addUser", async (req, res) => {
  try {
    const { userId, userEmail } = req.body;
    const { rows: user } = await db.query(
      "INSERT INTO users(id, email) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING*",
      [userId, userEmail]
    );
    // on conflict do nothing will return empty array because nothing was posted
    // but we need to send a response in json format(an object)
    // so if the array is empty, then send an empty object
    res.status(200).json(user.length === 0 ? {} : user[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// NOTE: need to add video first to video table because workout table references video id
// there should not be a duplicate workout (same userId and videoId) --> will need how to implement this to make sure if this conflict arises, then nothing happes (as in don't post new entry)
// add workout
app.post("/api/addWorkout", async (req, res) => {
  try {
    console.log("post a new workout request was made");
    const { videoId, userId, targetArea, exercises } = req.body;

    await addVideo(videoId);

    const { rows: workout } = await db.query(
      "INSERT INTO workouts(user_id, video_id, target_area, exercises) VALUES($1, $2, $3, $4) RETURNING*",
      [userId, videoId, targetArea, exercises]
    );
    res.json(workout[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// update a specific workout
app.put("/api/updateWorkout", async (req, res) => {
  try {
    console.log("update a new workout request made");
    const { videoId, userId, targetArea, exercises } = req.body;
    console.log(req.body);
    const { rows: workout } = await db.query(
      "UPDATE workouts SET target_area=$1, exercises=$2 WHERE user_id=$3 AND video_id=$4 RETURNING*",
      [targetArea, exercises, userId, videoId]
    );
    res.json(workout[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// get all saved workouts for a user
app.get("/api/savedWorkouts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // all saved workouts for a specific user
    const { rows: savedWorkouts } = await db.query(
      "SELECT workouts.id as workout_id, workouts.user_id, videos.id as video_id, videos.title, videos.channel_title, videos.thumbnail_url, workouts.exercises FROM workouts INNER JOIN videos ON workouts.video_id = videos.id WHERE workouts.user_id = $1",
      [userId]
    );
    // res.send("i was hit");
    res.json(savedWorkouts);
  } catch (error) {
    console.log(error.message);
  }
});

// get specific workout by videoId and userId
app.get("/api/workout", async (req, res) => {
  try {
    const { userId, videoId } = req.query;

    const { rows: workout } = await db.query(
      "SELECT * FROM workouts WHERE user_id = $1 AND video_id = $2 ",
      [userId, videoId]
    );
    res.status(200).json(workout.length === 0 ? {} : workout[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// delete specific workout by videoId and userId
app.delete("/api/delete", async (req, res) => {
  try {
    console.log("delete workout");
    const { userId, videoId } = req.query;
    const { rows: deleted } = await db.query(
      "DELETE FROM workouts WHERE user_id = $1 AND video_id = $2 ",
      [userId, videoId]
    );
    res.status(200).json("Post has been deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/*", (req, res) => {
  try {
    res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
  } catch (error) {
    console.log(error.message);
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
