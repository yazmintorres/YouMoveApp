export default {
  getWorkouts: async function (userId, targetArea) {
    try {
      console.log("getting workouts...");

      let url = `/api/savedWorkouts/${userId}`;

      if (targetArea) {
        url += `?targetArea=${targetArea}`;
      }

      const response = await fetch(url);

      const savedWorkouts = await response.json();
      return savedWorkouts;
    } catch (error) {
      console.log(error.message);
    }
  },

  getWorkout: async function (userId, videoId) {
    try {
      console.log("fetching workouts...");
      const response = await fetch(
        `/api/workout?userId=${userId}&videoId=${videoId}`
      );
      const workout = await response.json();
      return workout;
    } catch (error) {
      console.log(error.message);
    }
  },

  postWorkout: async function (userId, videoId, targetArea, exercises) {
    try {
      console.log("adding workout...");
      const workoutInfo = {
        userId,
        videoId,
        targetArea,
        exercises,
      };
      const response = await fetch(`/api/addWorkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutInfo),
      });
      const workoutAdded = response.json();
      return workoutAdded;
    } catch (error) {
      console.log(error.message);
    }
  },

  updateWorkout: async function (workoutId, targetArea, exercises) {
    try {
      console.log("updating workout...");
      const newWorkoutInfo = {
        exercises,
        targetArea,
      };
      const response = await fetch(`/api/updateWorkout/${workoutId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkoutInfo),
      });
      const workoutUpdated = response.json();
      return workoutUpdated;
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteWorkout: async function (workoutId) {
    try {
      console.log("deleting workout...");
      const response = await fetch(`/api/delete/${workoutId}`, {
        method: "DELETE",
      });
      const deleted = await response.json();
      return deleted;
    } catch (error) {
      console.log(error.message);
    }
  },
};
