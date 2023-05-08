import React from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";

const WorkoutCard = () => {
  return (
    <div className="grid grid-cols-2">
      <h2 className="col-span-full my-4 text-2xl font-bold tracking-wide">
        Your Saved Workout Card
      </h2>
      <VideoCard sourceId="YJPSR9dEQV8" />
    </div>
  );
};

export default WorkoutCard;
