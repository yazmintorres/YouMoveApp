import React from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import AddExercise from "./components/AddExercise";
import { useState } from "react";
import ExerciseCard from "@client/src/components/ExerciseCard/ExerciseCard";

const CreateWorkout = () => {
  const [exerciseAdded, setExerciseAdded] = useState(false);
  return (
    <div>
      <h2 className=" my-4  font-bold tracking-wide">Add Workout</h2>
      <div className="md:flex">
        <div className="flex w-full grow flex-col gap-3">
          <VideoCard
            videoId="YJPSR9dEQV8"
            channelTitle="channel name"
            title="Video Name"
          />
          <div className="border border-solid border-gray-500"></div>
          <form className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="target-area">Target Area*</label>
              <select
                className="input-field"
                name="target-area"
                id="target-area"
                required
              >
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
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3  ">
              <label htmlFor="rest-interval">Rest Interval</label>
              <input
                className="input-field w-20 basis-auto"
                type="number"
                name="minutes"
                placeholder="Minutes"
                id="rest-interval"
              ></input>
              <p>:</p>
              <input
                className="input-field w-20 basis-auto"
                type="number"
                placeholder="Seconds"
                id="rest-interval"
                name="seconds"
              ></input>
            </div>
            {exerciseAdded && (
              <button
                type="submit"
                className=" rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add Workout
              </button>
            )}
          </form>
        </div>
        <div className="flex w-full grow flex-col items-center gap-3">
          <AddExercise />
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
