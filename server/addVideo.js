const db = require("./db/db-connection.js");

async function addVideo(videoId) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const youtubeResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&id=${videoId}`
  );
  const data = await youtubeResponse.json();
  const videoInfo = data.items[0];
  // const if there is not the max res url use the high res

  const {
    id,
    etag,
    snippet: {
      title,
      channelTitle,
      thumbnails: {
        maxres: { url: thumbnailUrl },
      },
    },
  } = videoInfo;
  const { rows: video } = await db.query(
    "INSERT INTO videos (id, etag, title, channel_title, thumbnail_url) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING*",
    [id, etag, title, channelTitle, thumbnailUrl]
  );
}

module.exports = addVideo;
