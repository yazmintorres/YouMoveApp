import { createContext, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import CreateWorkout from "../pages/CreateWorkout/CreateWorkout";

const WorkoutContext = createContext();

const Provider = ({ children }) => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);

  // if exercises changes, inevitably workout changes
  // make a lists exercise component

  // GET
  const getWorkout = async (workoutId, isAuthenticated) => {
    try {
      if (isAuthenticated) {
        console.log("fetched workouts");
        const response = await fetch(`/api/workout/${workoutId}`);
        const workout = await response.json();
        setWorkout(workout?.id ? workout : {});
        setExercises(workout?.exercises || []);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // POST
  const postWorkout = async (userId, videoId, targetArea, exercises) => {
    try {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  // PUT
  const updateWorkout = async (workoutId, targetArea, exercises) => {
    try {
      const newWorkoutInfo = {
        exercises,
        targetArea,
      };
      const response = await fetch(`/api/updateWorkout/${workoutId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkoutInfo),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // DELETE
  const deleteWorkout = async (workoutId) => {
    try {
      const response = await fetch(`/api/delete/${workoutId}`, {
        method: "DELETE",
      });
      const deleted = await response.json();
      console.log("deleted");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("use effect called");
    setWorkout({ ...workout, exercises });
  }, [exercises]);

  const valuesToShare = {
    workout,
    exercises,
    setWorkout,
    setExercises,
    getWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout,
  };

  return (
    <WorkoutContext.Provider value={valuesToShare}>
      {children}
      <Outlet />
    </WorkoutContext.Provider>
  );
};

export { Provider };
export default WorkoutContext;
