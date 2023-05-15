export async function getWorkouts(userId) {
  try {
    console.log("getting workouts...");
    const response = await fetch(`/api/savedWorkouts/${userId}`);
    const savedWorkouts = await response.json();
    return savedWorkouts;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getWorkout(workoutId) {
  try {
    console.log("fetching workouts...");
    const response = await fetch(`/api/workout/${workoutId}`);
    const workout = await response.json();
    return workout;
  } catch (error) {
    console.log(error.message);
  }
}

export async function postWorkout(userId, videoId, targetArea, exercises) {
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
}

export async function updateWorkout(workoutId, targetArea, exercises) {
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
    const workoutUpdated = response.json();
    return workoutUpdated;
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteWorkout(workoutId) {
  try {
    const response = await fetch(`/api/delete/${workoutId}`, {
      method: "DELETE",
    });
    const deleted = await response.json();
    return deleted;
  } catch (error) {
    console.log(error.message);
  }
}
