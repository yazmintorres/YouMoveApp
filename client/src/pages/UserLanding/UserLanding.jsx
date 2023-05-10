import React, { useState, useEffect } from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import searchResponse from "@client/src/data/search-response";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UserLanding = () => {
  const youtubeKey = import.meta.env.VITE_YOUTUBE_KEY;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user } = useAuth0();
  console.log(user);

  // add new user to DB
  const addUserToDB = async () => {
    try {
      // i use if user for now because if the user is not logged in, i don't need to call the /api/addUser endpoint
      // can implement withAuthenticationRequired
      if (user) {
        const userInfo = { userId: user.sub, userEmail: user.email };
        const response = await fetch(`/api/addUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        });
        const userAdded = await response.json();
        // console.log(userAdded);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // if i have time, consider implementing a token as the dependency for when this function gets called
  useEffect(() => {
    addUserToDB();
    // console.log("api post");
  }, [user]);

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
    >
      <Link
        to="/create"
        state={{
          videoId: obj.id.videoId,
          channelTitle: obj.snippet.channelTitle,
          title: obj.snippet.title,
        }}
        className=" border-t-2 border-solid border-white bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
      >
        Add
      </Link>
    </VideoCard>
  ));

  // console.log(videos);

  return (
    <div>
      <div className="mb-7  gap-11 sm:flex">
        <div className="flex w-full grow flex-col gap-3">
          <h2 className="mb-1   font-bold tracking-wide">Find A New Workout</h2>
          <div className="border border-solid border-gray-500"></div>
          <form onSubmit={handleSubmit} className="order-1 flex sm:order-1 ">
            <label htmlFor="video-search" className="sr-only">
              Search
            </label>
            <input
              className=" grow rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
          <div className="order-2 flex flex-col gap-3 xl:grid xl:grid-cols-2 xl:gap-5">
            {videos}
          </div>
        </div>
        <div className="items-left flex w-full grow flex-col gap-3 ">
          <h2 className="mb-1">Your Workout Playlist</h2>
          <div className="border border-solid border-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLanding;
