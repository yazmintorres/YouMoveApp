import React from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import AddExercise from "./components/AddExercise";
import { useState } from "react";
import ExerciseCard from "@client/src/components/ExerciseCard/ExerciseCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const CreateWorkout = () => {
  const location = useLocation();
  const videoInfo = location.state;
  const { user } = useAuth0();
  const [workoutExercises, setWorkoutExercises] = useState(null);
  const [targetArea, setTargetArea] = useState("full-body");
  const navigate = useNavigate();

  const handleExerciseAdded = (exercises) => {
    if (exercises.length === 0) {
      setWorkoutExercises(null);
    } else {
      setWorkoutExercises(exercises);
    }
    console.log("Workout exercises:", workoutExercises);
  };

  const postWorkout = async () => {
    try {
      const addVideoResponse = await fetch(
        `/api/addVideo/${videoInfo.videoId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (addVideoResponse.ok) {
        // userId, targetArea, videoId, exercises
        const workoutInfo = {
          videoId: videoInfo.videoId,
          userId: user.sub,
          exercises: workoutExercises,
          targetArea: targetArea,
        };
        const addWorkoutResponse = await fetch(`/api/addWorkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(workoutInfo),
        });
      } else {
        console.log("video was not added corrctly to database");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postWorkout();
    // navigate("/dashboard");
  };
  return (
    <div>
      <h2 className=" my-4  font-bold tracking-wide">Add Workout</h2>
      <div className="md:flex">
        <div className="flex w-full grow flex-col gap-3">
          <VideoCard
            videoId={videoInfo.videoId}
            channelTitle={videoInfo.channelTitle}
            title={videoInfo.title}
          />
          <div className="border border-solid border-gray-500"></div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="target-area">Target Area*</label>
              <select
                className="input-field"
                name="target-area"
                id="target-area"
                value={targetArea}
                onChange={(e) => setTargetArea(e.target.value)}
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

            {workoutExercises && (
              <button
                type="submit"
                className=" rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add Workout
              </button>
            )}
          </form>
        </div>

        <AddExercise handleExerciseAdded={handleExerciseAdded} />
      </div>
    </div>
  );
};

export default CreateWorkout;
