const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
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
    user[0] && console.log("User added:", user[0]);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
});

// add video
app.post("/api/addVideo/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const youtubeResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&id=${videoId}`
    );
    const { items: videoInfo } = await youtubeResponse.json();
    const id = videoInfo[0].id;
    const etag = videoInfo[0].etag;
    const title = videoInfo[0].snippet.title;
    const channelTitle = videoInfo[0].snippet.channelTitle;
    const thumbnailUrl = videoInfo[0].snippet.thumbnails.maxres.url;
    const { rows: video } = await db.query(
      "INSERT INTO public.videos(id, etag, title, channel_title, thumbnail_url) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING*",
      [id, etag, title, channelTitle, thumbnailUrl]
    );

    res.status(200).json(video);
  } catch (error) {
    console.log(error.message);
  }
});

// NOTE: need to add video first to video table because workout table references video id
// add workout
app.post("/api/addWorkout", async (req, res) => {
  try {
    const { videoId, userId, targetArea, exercises } = req.body;
    console.log(req.body);
    const { rows: workout } = await db.query(
      "INSERT INTO workouts(user_id, video_id, target_area, exercises) VALUES($1, $2, $3, $4) RETURNING*",
      [userId, videoId, targetArea, exercises]
    );
    res.json(workout);
  } catch (error) {
    console.log(error.message);
  }
});

// get all saved workouts for a user
app.get("/api/savedWorkouts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    // all saved workouts for a specific user
    // need to send back videoId, title, channelTitle
    const { rows: savedWorkouts } = await db.query(
      "SELECT workouts.id as workout_id, workouts.user_id, videos.id as video_id, videos.title, videos.channel_title, videos.thumbnail_url, workouts.exercises FROM workouts INNER JOIN videos ON workouts.video_id = videos.id WHERE workouts.user_id = $1",
      [userId]
    );
    // res.send("i was hit");
    res.json(savedWorkouts);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// get specific workout by videoId and userId
app.get("/api/workout", async (req, res) => {
  try {
    console.log("test");
    const { userId, videoId } = req.query;
    console.log(userId, videoId);
    // all saved workouts for a specific user
    // need to send back videoId, title, channelTitle
    const { rows: workout } = await db.query(
      "SELECT * FROM workouts WHERE user_id = $1 AND video_id = $2 ",
      [userId, videoId]
    );
    if (workout.length === 0) res.send("");
    res.json(workout[0]);
    // res.send("i was hit");
    // res.json(workout[0]);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      iscurrent: req.body.iscurrent,
    };
    //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
    const result = await db.query(
      "INSERT INTO students(firstname, lastname, is_current) VALUES($1, $2, $3) RETURNING *",
      [newStudent.firstname, newStudent.lastname, newStudent.iscurrent]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for students
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await db.query("DELETE FROM students WHERE id=$1", [studentId]);
    console.log("From the delete request-url", studentId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a student
app.put("/api/students/:studentId", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId;
  const updatedStudent = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    iscurrent: req.body.is_current,
  };
  console.log("In the server from the url - the student id", studentId);
  console.log(
    "In the server, from the react - the student to be edited",
    updatedStudent
  );
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3 WHERE id=${studentId} RETURNING *`;
  const values = [
    updatedStudent.firstname,
    updatedStudent.lastname,
    updatedStudent.iscurrent,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
