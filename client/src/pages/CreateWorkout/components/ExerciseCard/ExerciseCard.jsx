import React, { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import WorkoutContext from "@client/src/contexts/workout";

const ExerciseCard = ({
  exercise,
  exerciseNumber,
  handleEditExercise,
  handleDeleteExercise,
}) => {
  // will need a word to be empty, singular, or plural depending on the amount inputted by user
  // ex. in regards to "sets" amount inputted by user. 0 = "", 1 = "set", >1 = "sets"
  // pluralWordDesc must be a plural string
  // using loose equality because input from user is in a string
  const singularPluralOrEmpty = (amount, pluralWordDesc) => {
    let transformWord;
    if (amount == 0) {
      transformWord = "";
    } else if (amount == 1) {
      // singular word
      transformWord = pluralWordDesc.slice(0, -1);
    } else {
      transformWord = pluralWordDesc;
    }
    return transformWord;
  };

  // will need to customize the string displayed on the workout card depending on the variations between reps/sets and minutes/seconds
  // ex. a user can input a rep, a set or both. if both are inputted = "1 set x 3rep", otherwise display either rep or set depending on which one was imputter
  const createCardStrings = (
    exercise,
    property1,
    property2,
    wordDesc1,
    wordDesc2
  ) => {
    const amount1 = Number(exercise[property1]);
    const amount2 = Number(exercise[property2]);

    const word1 = singularPluralOrEmpty(
      exercise[property1],
      wordDesc1 || property1
    );
    const word2 = singularPluralOrEmpty(
      exercise[property2],
      wordDesc2 || property2
    );
    if (amount1 && amount2) {
      return `${amount1} ${word1} x ${amount2} ${word2}`;
    } else if (amount1) {
      return `${amount1} ${word1}`;
    } else if (amount2) {
      return `${amount2} ${word1}`;
    } else {
      return "";
    }
  };

  const handleEditClick = () => {
    console.log("edit exercise requested ...");
    handleEditExercise(exercise, exerciseNumber);
  };

  const handleDeleteClick = () => {
    console.log("delete exercise requested ...");
    handleDeleteExercise(exerciseNumber);
  };

  return (
    <div className=" w-11/12 rounded-lg border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
      <div className="m-auto p-3">
        <div className=" flex items-center justify-between">
          <h3 className="my-0 w-12 basis-auto font-bold ">{exerciseNumber}</h3>

          <h3 className=" my-0 grow font-bold">
            {exercise.name[0].toUpperCase() + exercise.name.slice(1)}
          </h3>

          <div className=" flex gap-2">
            <MdModeEdit onClick={handleEditClick} className="text-xl" />
            <MdDeleteForever onClick={handleDeleteClick} className="text-xl" />
          </div>
        </div>
        {exercise.weight != 0 && (
          <p>{`${exercise.weight} ${singularPluralOrEmpty(
            exercise.weight,
            "lbs"
          )}`}</p>
        )}
        <p>{createCardStrings(exercise, "sets", "reps")}</p>
        <p>
          {createCardStrings(
            exercise,
            "durationMinutes",
            "durationSeconds",
            "mins",
            "secs"
          )}
        </p>
      </div>
    </div>
  );
};

export default ExerciseCard;
