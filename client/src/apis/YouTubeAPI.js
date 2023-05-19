export async function getSearchVideos(userSearchTerm, pageToken) {
  try {
    const searchQuery = userSearchTerm + "workouts women";
    const youtubeKey = import.meta.env.VITE_YOUTUBE_KEY;
    let url = `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&part=snippet&q=${searchQuery}&type=video&chart=mostPopular&maxResults=4`;
    if (pageToken) {
      url = `${url}&pageToken=${pageToken}`;
    }
    const response = await fetch(url);
    const searchResults = await response.json();
    return searchResults;
  } catch (error) {
    console.log(error.message);
  }
}
