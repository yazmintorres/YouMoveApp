import React, { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { singularPluralOrEmpty } from "./SingularPluralOrEmpty";
import { IoDuplicate } from "react-icons/io5";

import ExerciseForm from "../ExerciseForm/ExerciseForm";

const ExerciseAccordion = ({
  exercise,
  exerciseNumber,
  showForm,
  handleAddExercise,
  handleEditExercise,
  handleDeleteExercise,
  handleCloseForm,
}) => {
  const setsString = singularPluralOrEmpty(exercise.sets, "sets");
  const repsString = singularPluralOrEmpty(exercise.reps, "reps");
  const minutesString = singularPluralOrEmpty(exercise.durationMinutes, "mins");
  const secondsString = singularPluralOrEmpty(exercise.durationSeconds, "secs");
  const weightString = singularPluralOrEmpty(exercise.weight, "lbs");

  // console.log(exercise);

  const handleEditClick = () => {
    // console.log("edit exercise requested ...");
    handleEditExercise(exercise, exerciseNumber);
  };

  const handleDeleteClick = () => {
    // console.log("delete exercise requested ...");
    handleDeleteExercise(exerciseNumber);
  };

  return (
    <>
      <div className="w-full rounded-lg border-2 border-solid border-black pb-2 text-center md:mt-0 md:w-4/5">
        <div className=" m-auto flex items-center justify-between p-3 pb-1">
          <h3 className="my-0 w-12 basis-auto font-bold ">{exerciseNumber}</h3>

          <h3 className=" my-0 grow font-bold">
            {exercise.name[0].toUpperCase() + exercise.name.slice(1)}
          </h3>

          <div className=" flex gap-3">
            <MdModeEdit
              role="button"
              aria-label="edit"
              onClick={handleEditClick}
              className="text-xl"
            />
            <IoDuplicate
              role="button"
              aria-label="duplicated"
              className="text-xl"
              onClick={() => handleAddExercise(exercise)}
            />

            <MdDeleteForever onClick={handleDeleteClick} className="text-xl" />
          </div>
        </div>
        <p>{weightString}</p>
        <p>
          {setsString && minutesString
            ? `${setsString} x ${repsString}`
            : `${setsString} ${repsString}`}
        </p>
        <p>{`${minutesString} ${secondsString}`}</p>
      </div>
      {showForm && (
        <ExerciseForm
          exerciseNumber={exerciseNumber}
          exerciseToEdit={exercise}
          handleEditExercise={handleEditExercise}
          handleCloseForm={handleCloseForm}
        />
      )}
    </>
  );
};

export default ExerciseAccordion;
