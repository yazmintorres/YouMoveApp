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

// ADD USER TO DB
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
// ADD WORKOUT TO DB
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

// UPDATE WORKOUT BY WORKOUTID
app.put("/api/updateWorkout/:workoutId", async (req, res) => {
  try {
    console.log("update a workout request made");
    const { workoutId } = req.params;
    const { targetArea, exercises } = req.body;
    console.log(req.body);
    const { rows: workout } = await db.query(
      "UPDATE workouts SET target_area=$1, exercises=$2 WHERE id = $3 RETURNING*",
      [targetArea, exercises, workoutId]
    );
    res.json(workout[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// GET SAVED WORKOUTS FOR A USER BY USERID
app.get("/api/savedWorkouts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // all saved workouts for a specific user
    const { rows: savedWorkouts } = await db.query(
      "SELECT workouts.id as workout_id, workouts.user_id, videos.id as video_id, videos.title, videos.channel_title, videos.thumbnail_url, workouts.exercises FROM workouts INNER JOIN videos ON workouts.video_id = videos.id WHERE workouts.user_id = $1",
      [userId]
    );
    res.json(savedWorkouts);
  } catch (error) {
    console.log(error.message);
  }
});

// GET WORKOUT BY WORKOUTID
app.get("/api/workout/:workoutId", async (req, res) => {
  try {
    console.log("getting workout information...");
    const { workoutId } = req.params;
    const { rows: workout } = await db.query(
      "SELECT * FROM workouts WHERE id = $1 ",
      [workoutId]
    );
    res.status(200).json(workout.length === 0 ? {} : workout[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// GET WORKOUT BY USERID AND VIDEOID IF WORKOUT ID NOT AVAILABLE
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

// DELETE WORKOUT BY WORKOUT ID
app.delete("/api/delete/:workoutId", async (req, res) => {
  try {
    console.log("delete workout request made");
    const { workoutId } = req.params;
    const { rows: deleted } = await db.query(
      "DELETE FROM workouts WHERE id = $1 ",
      [workoutId]
    );
    res.status(200).json("workout has been deleted");
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
