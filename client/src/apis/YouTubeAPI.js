export async function getSearchVideos(searchQuery) {
  try {
    const youtubeKey = import.meta.env.VITE_YOUTUBE_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&part=snippet&q=${searchQuery}&type=video&maxResults=5`
    );
    const searchResults = await response.json();
    return searchResults;
  } catch (error) {
    console.log(error.message);
  }
}
