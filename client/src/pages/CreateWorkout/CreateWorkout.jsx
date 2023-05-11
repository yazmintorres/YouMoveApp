import React, { useEffect } from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import AddExercise from "./components/AddExercise";
import { useState } from "react";
import ExerciseCard from "@client/src/components/ExerciseCard/ExerciseCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const CreateWorkout = () => {
  const location = useLocation();
  const videoInfo = location.state;
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [workout, setWorkout] = useState({});
  const { user, isAuthenticated } = useAuth0();

  const [targetArea, setTargetArea] = useState("full-body");
  const navigate = useNavigate();

  // need to check if video has already been saved by a user
  // if so get saved workout info
  // pre-populate info

  const getWorkout = async () => {
    try {
      console.log("called");
      if (isAuthenticated) {
        const userId = user.sub;
        const response = await fetch(
          `/api/workout?userId=${userId}&videoId=${videoInfo.videoId}`
        );
        const workout = await response.json();
        console.log("workout response", workout);
        setTargetArea(workout?.target_area || "full-body");
        setWorkoutExercises(workout?.exercises || []);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // console.log(isAuthenticated);
    getWorkout();
  }, [isAuthenticated]);

  const handleExerciseAdded = (exercises) => {
    setWorkoutExercises(exercises);

    // console.log("Workout exercises:", workoutExercises);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postWorkout();
    navigate("/dashboard");
  };

  const exerciseCards = workoutExercises.map((exercise, index) => (
    <ExerciseCard
      key={index + 1}
      number={index + 1}
      durationMinutes={exercise.durationMinutes}
      durationSeconds={exercise.durationSeconds}
      name={exercise.name}
      weight={exercise.weight}
      sets={exercise.sets}
      reps={exercise.reps}
    />
  ));
  // console.log(exerciseCards);

  return (
    <div className="flex flex-col gap-2">
      <h2 className=" my-0 mt-4 font-bold tracking-wide">Add Workout</h2>
      <div className="border border-solid border-gray-500"></div>
      <div className="mt-2 md:flex">
        <div className="flex w-full grow flex-col gap-3">
          <VideoCard
            width="full"
            videoId={videoInfo.videoId}
            channelTitle={videoInfo.channelTitle}
            title={videoInfo.title}
          />
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

            {/* if workout exercises is not empty, show add workout button */}
            {workoutExercises.length !== 0 && (
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
          {" "}
          {exerciseCards}
          <AddExercise handleExerciseAdded={handleExerciseAdded} />
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
