import React from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";

const CreateWorkout = () => {
  return (
    <div className="grid grid-cols-2">
      <h2 className="col-span-full my-4 text-2xl font-bold tracking-wide">
        Add Workout
      </h2>
      <VideoCard sourceId="YJPSR9dEQV8" />
    </div>
  );
};

export default CreateWorkout;
