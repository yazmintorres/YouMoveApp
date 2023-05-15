import React, { useContext, useEffect } from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  postWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkout,
} from "@client/src/apis/WorkoutAPI";
import ListExercises from "./components/ListExercises/ListExercises";

const CreateWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoInfo = location.state;
  const { workoutId } = location.state;
  const { user, isAuthenticated } = useAuth0();

  const [workout, setWorkout] = useState({
    user_id: "",
    video_id: "",
    target_area: "full-body",
    exercises: [],
  });

  console.log("exercises", workout.exercises);

  const handleChange = (e) => {
    setWorkout({ ...workout, target_area: e.target.value });
  };

  useEffect(() => {
    const workout = async () => {
      if (workoutId) {
        const workout = await getWorkout(workoutId);
        setWorkout(workout);
      } else {
        // need to check if the videoId clicked on is associated with a workout by the user, if so get workout info with that if
      }
    };
    workout();
  }, [isAuthenticated]);

  const handleClickDelete = async () => {
    await deleteWorkout(workoutId);
    navigate("/dashboard");
  };

  // workout form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (workoutId) {
      console.log("updating workout...");
      await updateWorkout(workoutId, workout.target_area, workout.exercises);
    } else {
      console.log("adding workout");
      await postWorkout(
        user.sub,
        videoInfo.videoId,
        workout.target_area,
        workout.exercises
      );
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className=" mt-4 flex flex-wrap justify-center sm:justify-between md:mr-11 ">
        <div className="w-3/4">
          <h2 className=" my-0 truncate font-bold tracking-wide">
            {workoutId ? videoInfo.title : "Add Workout"}
          </h2>
        </div>
        {workoutId ? (
          <button
            onClick={handleClickDelete}
            className="btn btn-actions bg-rose-600 hover:bg-rose-700  "
          >
            Delete workout
          </button>
        ) : null}
      </div>

      <div className="border border-solid border-gray-500"></div>
      <div className="mt-2 md:flex">
        <div className="flex w-full grow flex-col gap-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="target-area">Target Area*</label>
              <select
                className="input-field"
                name="target-area"
                id="target-area"
                value={workout.target_area}
                onChange={handleChange}
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

            {workout.exercises?.length !== 0 && (
              <button type="submit" className=" btn-actions order-3">
                {workoutId ? "Save Workout" : "Add Workout"}
              </button>
            )}
          </form>
          <VideoCard
            width="full"
            videoId={videoInfo.videoId}
            channelTitle={videoInfo.channelTitle}
            title={videoInfo.title}
          />
          {/* if workout exercises is not empty, show add workout button */}
        </div>

        <div className="flex w-full grow flex-col items-center gap-3">
          {" "}
          <ListExercises workout={workout} setWorkout={setWorkout} />
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
