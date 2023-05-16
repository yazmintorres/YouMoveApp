import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseCard from "../ExerciseCard/ExerciseCard";

const ListExercises = ({ workout, setWorkout }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null);

  const handleAddClick = () => {
    setShowAddForm(true);
    setShowEditForm(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowEditForm(null);
  };

  const handleAddExercise = (newExercise) => {
    console.log("adding exercise...");
    const exercises = [...workout.exercises, newExercise];
    setWorkout((prevWorkout) => ({ ...prevWorkout, exercises }));
  };

  const handleEditExercise = (exercise, exerciseNumber) => {
    setShowEditForm(exerciseNumber);
    setShowAddForm(false);

    console.log("editing exercise...");
    const currentExerciseIndex = workout.exercises.findIndex(
      (exercise, index) => index + 1 === exerciseNumber
    );
    const exercises = [
      ...workout.exercises.slice(0, currentExerciseIndex),
      exercise,
      ...workout.exercises.slice(currentExerciseIndex + 1),
    ];
    setWorkout((prevWorkout) => ({ ...prevWorkout, exercises }));
  };

  const handleDeleteExercise = (exerciseNumber) => {
    console.log("deleting exercise...");
    let exercises = workout.exercises.filter(
      (exercise, index) => index + 1 !== exerciseNumber
    );
    setWorkout((prevWorkout) => ({ ...prevWorkout, exercises }));
  };

  const exerciseCards = workout.exercises.map((exercise, index) => {
    return (
      <div key={index} className="flex w-full flex-col items-center gap-3">
        <ExerciseCard
          key={index + 1}
          exerciseNumber={index + 1}
          exercise={exercise}
          handleEditExercise={handleEditExercise}
          handleDeleteExercise={handleDeleteExercise}
        />
        {showEditForm === index + 1 && (
          <ExerciseForm
            exerciseNumber={index + 1}
            exerciseToEdit={exercise}
            handleCloseForm={handleCloseForm}
            handleAddExercise={handleAddExercise}
            handleEditExercise={handleEditExercise}
          />
        )}
      </div>
    );
  });

  return (
    <div className="flex w-full grow flex-col items-center gap-3">
      {" "}
      {exerciseCards}
      {showAddForm ? (
        <ExerciseForm
          handleCloseForm={handleCloseForm}
          handleAddExercise={handleAddExercise}
          handleEditExercise={handleEditExercise}
        />
      ) : (
        <div
          onClick={handleAddClick}
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
  );
};

export default ListExercises;
