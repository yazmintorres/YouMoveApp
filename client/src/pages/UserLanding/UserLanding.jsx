import React, { useState } from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import searchResponse from "@client/src/data/search-response";

// notes
// path element is the search icon

const UserLanding = () => {
  const youtubeKey = import.meta.env.VITE_YOUTUBE_KEY;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchTerm);
  console.log(searchResult);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&part=snippet&q=${searchTerm}&type=video&maxResults=5`
    // );
    // const searchResults = await response.json();
    // working with mock data
    const searchResults = searchResponse;
    setSearchResult(searchResults.items);
  };

  const videos = searchResult.map((obj) => (
    <VideoCard
      key={obj.id.videoId}
      videoId={obj.id.videoId}
      title={obj.snippet.title}
      channelTitle={obj.snippet.channelTitle}
    />
  ));

  console.log(videos);

  return (
    <div className=" grid-cols-5 gap-x-9 sm:grid">
      <h2 className="col-start-1 col-end-3">Find A New Workout</h2>
      <form
        onSubmit={handleSubmit}
        className="col-start-1 col-end-3 flex sm:order-1"
      >
        <label htmlFor="video-search" className="sr-only">
          Search
        </label>
        <input
          className="  grow rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="search"
          placeholder="Search for a workout"
          id="video-search"
          name="video-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        ></input>
        <button
          type="submit"
          className=" rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Search
        </button>
      </form>
      {videos}
      <h2 className="col-start-3 col-end-6">Your Workout Playlist</h2>
    </div>
  );
};

export default UserLanding;
