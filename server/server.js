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

app.get("/*", (req, res) => {
  try {
    res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
  } catch (error) {
    console.log(error.message);
  }
});

// add new user to DB
app.post("/api/addUser", async (req, res) => {
  try {
    const { userId, userEmail } = req.body;
    const { rows: user } = await db.query(
      "INSERT INTO users(id, email) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING*",
      [userId, userEmail]
    );
    user[0] && console.log("User added:", user[0]);
    res.json(user[0] ? user[0] : {});
  } catch (error) {
    console.log(error.message);
  }
});

// add video
app.post("/addVideo/:videoId", async (req, res) => {
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
    const thumbnailUrl = videoInfo[0].snippet.thumbnails.standard.url;
    const { rows: video } = await db.query(
      "INSERT INTO public.videos(id, etag, title, channel_title, thumbnail_url) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING*",
      [id, etag, title, channelTitle, thumbnailUrl]
    );

    // user[0] && console.log("User added:", user[0]);
    res.json(video[0] ? video[0] : {});
  } catch (error) {
    console.log(error.message);
  }
});

// add workout
//add exercises

// create the get request for students in the endpoint '/api/students'
app.get("/api/students", async (req, res) => {
  try {
    const { rows: students } = await db.query("SELECT * FROM students");
    res.send(students);
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
