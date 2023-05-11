import React, { useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import VideoCard from "@client/src/components/VideoCard/VideoCard";
import ExerciseCard from "@client/src/pages/CreateWorkout/components/ExerciseCard/ExerciseCard";
import ExerciseForm from "./components/ExerciseForm/ExerciseForm";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const CreateWorkout = () => {
  const location = useLocation();
  const videoInfo = location.state;
  const [showForm, setShowForm] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [newWorkout, setNewWorkout] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const [targetArea, setTargetArea] = useState("full-body");
  const navigate = useNavigate();

  const handleShowForm = (bool) => {
    setShowForm(bool);
  };

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
        setShowForm(workout?.id ? false : true);
        setNewWorkout(workout?.id ? false : true);
        setTargetArea(workout?.target_area || "full-body");
        setWorkoutExercises(workout?.exercises || []);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(newWorkout);

  useEffect(() => {
    // console.log(isAuthenticated);
    getWorkout();
  }, [isAuthenticated]);

  const handleExerciseAdded = (exercise) => {
    setWorkoutExercises((prevWorkoutExercises) => [
      ...prevWorkoutExercises,
      exercise,
    ]);
    setShowForm(false);
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
      handleShowForm={handleShowForm}
    />
  ));

  const handleClickDelete = async () => {
    const userId = user.sub;
    const response = await fetch(
      `/api/delete?userId=${userId}&videoId=${videoInfo.videoId}`,
      {
        method: "DELETE",
      }
    );
    const deleted = await response.json();
    console.log("deleted");
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

            {workoutExercises.length !== 0 && (
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
          {exerciseCards}
          {showForm ? (
            <ExerciseForm
              handleExerciseAdded={handleExerciseAdded}
              handleShowForm={handleShowForm}
            />
          ) : (
            <div
              onClick={() => handleShowForm(true)}
              className=" w-11/12 rounded-lg border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5"
            >
              <div className="m-auto p-3">
                <h3 className="my-0 flex items-center justify-center gap-2 font-bold">
                  <MdAddCircle />
                  Add Exercise
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
