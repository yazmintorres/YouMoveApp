import React, { useContext, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import WorkoutContext from "@client/src/contexts/workout";

const ListExercises = ({ exercises, handleExerciseDeleted }) => {
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

  const handleEditExercise = (exerciseNumber) => {
    setShowEditForm(exerciseNumber);
    setShowAddForm(false);
  };

  const handleDeleteExercise = (exerciseNumber) => {
    handleExerciseDeleted(exerciseNumber);
  };

  const exerciseCards = exercises.map((exercise, index) => {
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
          />
        )}
      </div>
    );
  });

  return (
    <div className="flex w-full grow flex-col items-center gap-3">
      {" "}
      {exerciseCards}
      {showAddForm ? null : (
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
      {showAddForm ? <ExerciseForm handleCloseForm={handleCloseForm} /> : null}
    </div>
  );
};

export default ListExercises;
