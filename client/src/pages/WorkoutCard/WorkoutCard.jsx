import React from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import { useLocation } from "react-router-dom";
import ExerciseCard from "@client/src/components/ExerciseCard/ExerciseCard";

const WorkoutCard = () => {
  const location = useLocation();
  const { workoutInfo } = location.state;
  console.log(workoutInfo);
  const exerciseCards = workoutInfo.exercises.map((exercise, index) => (
    <ExerciseCard
      key={index}
      number={index + 1}
      name={exercise.name}
      durationMinutes={exercise.durationMinutes}
      durationSeconds={exercise.durationSeconds}
      sets={exercise.sets}
      reps={exercise.reps}
      weight={exercise.weight}
    />
  ));

  return (
    <div className="flex flex-col gap-2">
      <h2 className=" my-0 mt-4  font-bold tracking-wide">
        {workoutInfo.title}
      </h2>
      <div className="border border-solid border-gray-500"></div>
      <div className="mt-2 md:flex">
        <div className="flex w-full grow flex-col gap-3">
          <VideoCard
            videoId={workoutInfo.video_id}
            channelTitle={workoutInfo.channel_title}
            // title={videoInfo.title}
          />
        </div>
        <div className="flex w-full grow flex-col items-center gap-3">
          {exerciseCards}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
