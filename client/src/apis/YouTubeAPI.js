export async function getSearchVideos(userSearchTerm, pageToken) {
  try {
    // console.log("calling youtube search api");
    const containsWorkout = /\bworkout\b|\bworkouts\b/i.test(userSearchTerm);
    const containsWomen = /\bwomen\b|\bwomens\b/i.test(userSearchTerm);

    let searchQuery = userSearchTerm;

    if (!containsWorkout) {
      searchQuery = `${searchQuery} workouts`;
    }
    if (!containsWomen) {
      searchQuery = `${searchQuery} women`;
    }

    const youtubeKey = import.meta.env.VITE_YOUTUBE_KEY;
    let url = `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&part=snippet&q=${searchQuery}&type=video&chart=mostPopular&maxResults=50`;
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
