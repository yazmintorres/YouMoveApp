import { createContext, useCallback, useState } from "react";

const WorkoutContext = createContext();

const Provider = ({ children }) => {
  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);

  // GET
  const getWorkout = async (userId, videoId, isAuthenticated) => {
    try {
      if (isAuthenticated) {
        const response = await fetch(
          `/api/workout?userId=${userId}&videoId=${videoId}`
        );
        const workout = await response.json();
        setExercises(workout?.exercises || []);
        setWorkout(workout?.id ? workout : {});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // POST
  const postWorkout = async (videoId, userId, exercises, targetArea) => {
    try {
      const addVideoResponse = await fetch(`/api/addVideo/${videoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (addVideoResponse.ok) {
        const workoutInfo = {
          videoId,
          userId,
          exercises,
          targetArea,
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

  // CONST
  const deleteWorkout = async (userId, videoId) => {
    try {
      const response = await fetch(
        `/api/delete?userId=${userId}&videoId=${videoId}`,
        {
          method: "DELETE",
        }
      );
      const deleted = await response.json();
      console.log("deleted");
    } catch (error) {
      console.log(error.message);
    }
  };

  // PUT
  const updateWorkout = async (userId, videoId, targetArea, exercises) => {
    try {
      const newWorkoutInfo = {
        videoId,
        userId,
        exercises,
        targetArea,
      };
      const response = await fetch(`/api/updateWorkout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkoutInfo),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const valuesToShare = {
    workout,
    exercises,
    getWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout,
  };

  return (
    <WorkoutContext.Provider value={valuesToShare}>
      {children}
    </WorkoutContext.Provider>
  );
};

export { Provider };
export default WorkoutContext;
