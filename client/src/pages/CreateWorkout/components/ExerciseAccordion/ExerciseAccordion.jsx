import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { singularPluralOrEmpty } from "./SingularPluralOrEmpty";
import { IoDuplicate } from "react-icons/io5";

import ExerciseForm from "../ExerciseForm/ExerciseForm";

const ExerciseAccordion = ({
  exercise,
  exerciseNumber,
  showForm,
  handleAddExercise,
  handleEditExercise,
  handleShowEditForm,
  handleDeleteExercise,
  handleCloseForm,
}) => {
  let opacity = "";
  if (exercise.exerciseCompleted) {
    opacity = "opacity-30";
  }

  const setsString = singularPluralOrEmpty(exercise.sets, "sets");
  const repsString = singularPluralOrEmpty(exercise.reps, "reps");
  const minutesString = singularPluralOrEmpty(exercise.durationMinutes, "mins");
  const secondsString = singularPluralOrEmpty(exercise.durationSeconds, "secs");
  const weightString = singularPluralOrEmpty(exercise.weight, "lbs");

  const handleEditClick = () => {
    handleShowEditForm(exerciseNumber);
  };

  const handleDeleteClick = () => {
    handleDeleteExercise(exerciseNumber);
  };

  const handleChange = (e, i) => {
    let setsCompleted = [];

    // i'm doing if else becuase if setsCompleted key does not exist will get an error because of slice
    if (exercise?.setsCompleted) {
      setsCompleted = [
        ...exercise.setsCompleted.slice(0, i),
        e.target.checked,
        ...exercise.setsCompleted.slice(i + 1),
      ];
    } else {
      // console.log("logging");
      setsCompleted[i] = e.target.value;
    }

    console.log("sets completed:", setsCompleted);
    exercise = {
      ...exercise,
      setsCompleted,
    };

    handleEditExercise(exercise, exerciseNumber);
  };

  const checkboxes = [];
  for (let i = 0; i < exercise.sets - 1; i++) {
    checkboxes.push(
      <React.Fragment key={i}>
        <label
          htmlFor={i + 1}
          className="inline-block  bg-red-500 text-sm font-bold"
        ></label>
        <input
          id={i + 1}
          checked={
            exercise?.setsCompleted ? exercise.setsCompleted[i] ?? false : false
          }
          onChange={(e) => handleChange(e, i)}
          type="checkbox"
          className=""
        />
      </React.Fragment>
    );
  }

  const handleExerciseCompleted = () => {
    exercise = {
      ...exercise,
      exerciseCompleted: !exercise.exerciseCompleted,
    };

    handleEditExercise(exercise, exerciseNumber);
  };

  return (
    <>
      <div
        className={`relative flex w-full flex-col items-center rounded-lg border-2 border-solid border-black text-center md:mt-0 md:w-4/5 ${opacity}`}
      >
        {/* <div className=" relative m-auto flex w-full items-center justify-center p-3 pb-1"> */}
        <h3 className="absolute left-0 my-1 w-12 basis-auto font-bold">
          {exerciseNumber}
        </h3>
        <div className="absolute right-0 my-1 flex gap-2">
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

        <div className="flex flex-col items-center">
          <h3 className=" my-1 grow font-bold">
            {exercise.name[0].toUpperCase() + exercise.name.slice(1)}
          </h3>

          {/* </div> */}

          <p>{weightString}</p>
          <p>
            {setsString && repsString
              ? `${setsString} x ${repsString}`
              : `${setsString} ${repsString}`}
          </p>
          <p>{`${minutesString} ${secondsString}`}</p>
          <div className="my-1 flex w-full justify-center gap-1">
            {exercise.sets > 0 && <p>Set:</p>}
            {checkboxes}
            <button
              onClick={handleExerciseCompleted}
              className="ml-1 flex items-center rounded  border-2 border-solid border-blue-900 bg-yellow-300 px-1 text-sm hover:bg-yellow-500 "
            >
              Done <MdStar />
            </button>
          </div>
        </div>
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
