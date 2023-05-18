import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import ExerciseForm from "./ExerciseForm/ExerciseForm";
import { singularPluralOrEmpty } from "./ExerciseCard/SingularPluralOrEmpty";

// my accordion will display the exercise card (title)
// and the exerciseForm for the content

// accordion prop will be the array of exercises

const Accordion = ({
  exercises,
  exercise,
  showForm,
  handleEditExercise,
  handleCloseForm,
}) => {
  // const [showForm, setShowForm] = useState(false);

  // const [indexToExpand, setIndexToExpand] = useState(0);

  // const renderedExercises = exercises.map((exercise, index) => {
  //   const expand = index === expandedIndex;

  //   return ()

  // })
  const handleEditClick = () => {
    console.log("edit exercise requested ...");
    handleEditExercise(exercise);

    // setShowForm(true);
  };

  const setsString = singularPluralOrEmpty(exercise.sets, "sets");
  const repsString = singularPluralOrEmpty(exercise.reps, "reps");
  const minutesString = singularPluralOrEmpty(exercise.durationMinutes, "mins");
  const secondsString = singularPluralOrEmpty(exercise.durationSeconds, "secs");
  const weightString = singularPluralOrEmpty(exercise.weight, "lbs");

  return (
    <div>
      <div className=" w-11/12 rounded-lg border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
        <div className="m-auto p-3">
          <div className=" flex items-center justify-between">
            <h3 className="my-0 w-12 basis-auto font-bold ">{exercise.id}</h3>

            <h3 className=" my-0 grow font-bold">
              {exercise.name[0].toUpperCase() + exercise.name.slice(1)}
            </h3>

            <div className=" flex gap-2">
              <MdModeEdit
                role="button"
                aria-label="edit"
                onClick={handleEditClick}
                className="text-xl"
              />
              <MdDeleteForever
                // onClick={handleDeleteClick}
                className="text-xl"
              />
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
            exerciseToEdit={exercise}
            handleEditExercise={handleEditExercise}
            handleCloseForm={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
};

export default Accordion;
