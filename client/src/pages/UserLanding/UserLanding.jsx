import React, { useState, useEffect } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import WorkoutAPI from "../../apis/WorkoutAPI";
import { addUser } from "../../apis/UserAPI";
import { getSearchVideos } from "../../apis/YouTubeAPI";
import searchResponse from "../../data/search-response";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UserLanding = () => {
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [targetAreaFilter, setTargetAreaFilter] = useState("");
  const [searchedVideos, setSearchedVideos] = useState([]);

  const [workoutsToShow, setWorkoutsToShow] = useState(2);
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  const [nextPageToken, setNextPageToken] = useState("");
  const { user } = useAuth0();

  // add new user to DB
  const addUserToDB = async () => {
    try {
      if (user) {
        console.log("i am running");
        const userAdded = await addUser(user.sub, user.email);
        console.log("userAdded:", userAdded);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // get saved workouts from DB
  const getSavedWorkouts = async (targetAreaFilter) => {
    try {
      if (user) {
        const userId = user.sub;
        const savedWorkouts = await WorkoutAPI.getWorkouts(
          userId,
          targetAreaFilter
        );
        console.log(savedWorkouts);
        setSavedWorkouts(savedWorkouts.reverse());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    addUserToDB();
    getSavedWorkouts();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const searchResults = await getSearchVideos(userSearchTerm);

    // working with mock data
    const searchResults = searchResponse;

    setNextPageToken(searchResults.nextPageToken);
    setSearchedVideos(searchResults.items);
  };

  const loadMoreSearch = async () => {
    const searchResults = await getSearchVideos(userSearchTerm, nextPageToken);
    setNextPageToken(searchResults.nextPageToken);
    setSearchedVideos((prevVideos) => [...prevVideos, ...searchResults.items]);
  };

  const loadMoreWorkouts = () => {
    setWorkoutsToShow((prevValue) => prevValue + 2);
  };

  // MANAGE WHEN TARGET AREA FILTER  IS UPDATED
  const handleTargetAreaFilterChange = (e) => {
    setTargetAreaFilter(e.target.value);
  };

  useEffect(() => {
    getSavedWorkouts(targetAreaFilter);
  }, [targetAreaFilter]);

  console.log(targetAreaFilter);

  const workoutVideos = savedWorkouts.slice(0, workoutsToShow).map((obj) => (
    <VideoCard
      key={obj.video_id}
      thumbnailUrl={obj.thumbnail_url}
      title={obj.title}
      channelTitle={obj.channel_title}
    >
      {" "}
      <Link
        to={`/workout?edit=${obj.workout_id}`}
        state={{
          workoutId: obj.workout_id,
          videoId: obj.video_id,
          channelTitle: obj.channel_title,
          title: obj.title,
        }}
        className=" border-t-2 border-solid border-white bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
      >
        View
      </Link>
    </VideoCard>
  ));

  const searchVideos = searchedVideos.map((obj) => (
    <VideoCard
      key={obj.id.videoId}
      videoId={obj.id.videoId}
      title={obj.snippet.title}
      channelTitle={obj.snippet.channelTitle}
    >
      <Link
        to="/workout?add=true"
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

  return (
    <div data-testid="landing">
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
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              required
            ></input>
            <button
              type="submit"
              className=" rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Search
            </button>
          </form>
          <div className="order-2 flex flex-col items-start gap-3 xl:grid xl:grid-cols-2 xl:gap-5">
            {searchVideos}
            {searchVideos.length > 0 && (
              <button
                onClick={loadMoreSearch}
                className="btn order-3 w-1/2 xl:col-span-full xl:m-auto "
              >
                Load More
              </button>
            )}
          </div>
        </div>
        <div className="items-left flex w-full grow flex-col gap-3 ">
          <h2 className="mb-1">Your Workout Playlist</h2>
          <div className="border border-solid border-gray-500"></div>
          {/* <div className="h-9"></div> */}
          <div className="flex items-center gap-2 text-base font-medium">
            <label htmlFor="filter-by">Filter By Target Area:</label>
            <select
              className="input-field grow focus:border-transparent focus:ring-transparent "
              name="filter-by"
              id="filter-by"
              // defaultValue="default"
              value={targetAreaFilter}
              onChange={handleTargetAreaFilterChange}
              required
            >
              <option value="">Filter Off</option>
              <option value="full-body">Full Body</option>
              <option value="upper-body">Upper Body</option>
              <option value="lower-body">Lower Body</option>
              <option value="arms">Arms</option>
              <option value="abs">Abs</option>
              <option value="back">Back</option>
              <option value="chest">Chest</option>
              <option value="shoulders">Shoulders</option>
              <option value="legs">Legs</option>
              <option value="glutes">Glutes</option>
              <option value="calves">Calves</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="order-2 flex flex-col items-start gap-3 xl:grid xl:grid-cols-2 xl:gap-5">
            {workoutVideos}
            {workoutsToShow < savedWorkouts.length && (
              <button
                onClick={loadMoreWorkouts}
                className="btn order-3 w-1/2 xl:col-span-full xl:m-auto"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLanding;
