import React from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";

const UserLanding = () => {
  return (
    <div className="grid grid-cols-2">
      <h2>Find A New Workout</h2>
      <h2>Your Workout Playlist</h2>
      <div>
        <input type="text" placeholder="search a workout" />
      </div>
    </div>
  );
};

export default UserLanding;
