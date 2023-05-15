import React, { useContext, useEffect } from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import WorkoutContext from "@client/src/contexts/workout";
import ListExercises from "./components/ListExercises/ListExercises";

const CreateWorkout = () => {
  const location = useLocation();
  const videoInfo = location.state;
  const { workoutId } = location.state;
  const [newWorkout, setNewWorkout] = useState(false);

  const {
    workout,
    exercises,
    setWorkout,
    getWorkout,
    deleteWorkout,
    postWorkout,
    updateWorkout,
  } = useContext(WorkoutContext);

  const { user, isAuthenticated } = useAuth0();

  const [targetArea, setTargetArea] = useState(
    workout?.target_area || "full-body"
  );

  console.log(targetArea);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getWorkout(workoutId, isAuthenticated);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setNewWorkout(workout?.id ? false : true);
    setTargetArea(workout?.target_area || "full-body");
  }, [workout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(targetArea);
    setWorkout({ ...workout, target_area: targetArea });
    if (newWorkout) {
      await postWorkout(user.sub, videoInfo.videoId, targetArea, exercises);
    } else {
      await updateWorkout(workoutId, targetArea, exercises);
    }

    navigate("/dashboard");
  };

  //this works
  const handleClickDelete = () => {
    deleteWorkout(workoutId);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className=" mt-4 flex flex-wrap justify-center sm:justify-between md:mr-11 ">
        <div className="w-3/4">
          <h2 className=" my-0 truncate font-bold tracking-wide">
            {newWorkout ? "Add Workout" : videoInfo.title}
          </h2>
        </div>
        {newWorkout || (
          <button
            onClick={handleClickDelete}
            className="btn btn-actions bg-rose-600 hover:bg-rose-700  "
          >
            Delete workout
          </button>
        )}
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

            {exercises.length !== 0 && (
              <button type="submit" className=" btn-actions order-3">
                {newWorkout ? "Add Workout" : "Save Workout"}
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
          <ListExercises />
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
