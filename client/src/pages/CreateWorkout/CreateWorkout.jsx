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
  const [newWorkout, setNewWorkout] = useState(false);
  const { getWorkout, workout, setWorkout, exercises, deleteWorkout } =
    useContext(WorkoutContext);
  const { user, isAuthenticated } = useAuth0();
  console.log(workout);

  const [targetArea, setTargetArea] = useState("full-body");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getWorkout(user.sub, videoInfo.videoId, isAuthenticated);
    }
    setNewWorkout(workout?.id ? false : true);
    setTargetArea(workout?.target_area || "full-body");
  }, [isAuthenticated]);

  const handleExerciseAdded = (exercise) => {
    console.log(exercise);
    // setWorkoutExercises((prevWorkoutExercises) => [
    //   ...prevWorkoutExercises,
    //   exercise,
    // ]);
    // setShowForm(false);
    // console.log("Workout exercises:", workoutExercises);
  };

  // const handleShowForm = (bool) => {
  //   setShowForm(bool);
  // };

  const handleEditExercise = (exercise) => {
    setExercise(exercise);
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

  const updateWorkout = async () => {
    try {
      // userId, targetArea, videoId, exercises
      const workoutInfo = {
        videoId: videoInfo.videoId,
        userId: user.sub,
        exercises: workoutExercises,
        targetArea: targetArea,
      };
      const response = await fetch(`/api/updateWorkout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutInfo),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newWorkout) {
      await postWorkout();
    } else {
      await updateWorkout();
    }

    navigate("/dashboard");
  };

  //this works
  const handleClickDelete = () => {
    deleteWorkout(user.sub, videoInfo.videoId);
  };

  // const handleAddExercise = () => {
  //   handleShowForm(true);
  //   setExercise({
  //     name: "",
  //     durationMinutes: "",
  //     durationSeconds: "",
  //     weight: "",
  //     reps: "",
  //     sets: "",
  //   });
  // };

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
                value={workout.target_area}
                onChange={(e) =>
                  setWorkout({ ...workout, target_area: e.target.value })
                }
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
