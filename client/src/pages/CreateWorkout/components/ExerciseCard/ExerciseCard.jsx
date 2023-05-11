import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const ExerciseCard = ({
  exercise,
  handleShowForm,
  number,
  handleEditExercise,
}) => {
  // console.log(exercise);
  // console.log(exercise.weight);

  // sets and reps
  if (Number(exercise.sets) === 0) {
    exercise.sets = "";
  } else if (Number(exercise.sets) === 1) {
    exercise.sets = `1 set`;
  } else if (Number(exercise.sets) > 1) {
    exercise.sets = `${exercise.sets} sets`;
  }

  if (Number(exercise.reps) === 0) {
    exercise.reps = "";
  } else if (Number(exercise.reps) === 1) {
    exercise.reps = `1 rep`;
  } else if (Number(exercise.reps) > 1) {
    exercise.reps = `${exercise.reps} reps`;
  }

  let setsAndReps = "";
  if (exercise.sets && exercise.reps) {
    setsAndReps = `${exercise.sets} x ${exercise.reps}`;
  } else if (exercise.sets) {
    setsAndReps = exercise.sets;
  } else if (exercise.reps) {
    setsAndReps = exercise.reps;
  }

  // duration minutes and seconds
  if (Number(exercise.durationMinutes) === 0) {
    exercise.durationMinutes = "";
  } else if (Number(exercise.durationMinutes) === 1) {
    exercise.durationMinutes = `1 min`;
  } else if (Number(exercise.durationMinutes) > 1) {
    exercise.durationMinutes = `${exercise.durationMinutes} mins`;
  }

  if (Number(exercise.durationSeconds) === 0) {
    exercise.durationSeconds = "";
  } else if (Number(exercise.durationSeconds) === 1) {
    exercise.durationSeconds = `1 sec`;
  } else if (Number(exercise.durationSeconds) > 1) {
    exercise.durationSeconds = `${exercise.durationSeconds} secs`;
  }

  let minutesAndSeconds = "";
  if (exercise.durationMinutes && exercise.durationSeconds) {
    minutesAndSeconds = `${exercise.durationMinutes} ${exercise.durationSeconds} `;
  } else if (exercise.durationMinutes) {
    minutesAndSeconds = exercise.durationMinutes;
  } else if (exercise.durationSeconds) {
    minutesAndSeconds = exercise.durationSeconds;
  }

  // weight
  // if (Number(exercise.weight) === 0) {
  //   exercise.weight = "";
  // } else if (Number(exercise.weight) === 1) {
  //   exercise.weight = `1 lb`;
  // } else if (Number(exercise.weight) > 1) {
  //   exercise.weight = `${exercise.weight} lbs`;
  // }

  const handleEditClick = () => {
    handleShowForm(true);
    handleEditExercise(exercise);
    console.log("do something");
  };

  return (
    <div className=" w-11/12 rounded-lg border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
      <div className="m-auto p-3">
        <div className=" flex items-center justify-between">
          <h3 className="my-0 w-12 basis-auto font-bold ">{number}</h3>

          <h3 className=" my-0 grow font-bold">
            {exercise.name[0].toUpperCase() + exercise.name.slice(1)}
          </h3>

          <div className=" flex gap-2">
            <MdModeEdit onClick={handleEditClick} className="text-xl" />
            <MdDeleteForever className="text-xl" />
          </div>
        </div>
        {minutesAndSeconds && <p>{minutesAndSeconds}</p>}
        {exercise.weight && <p>{exercise.weight}</p>}
        {setsAndReps && <p>{setsAndReps}</p>}
      </div>
    </div>
  );
};

export default ExerciseCard;
