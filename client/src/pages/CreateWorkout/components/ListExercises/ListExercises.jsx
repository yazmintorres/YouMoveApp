import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseAccordion from "../ExerciseAccordion/ExerciseAccordion";

const ListExercises = ({
  exercises,
  addExercise,
  editExercise,
  deleteExercise,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(-1);

  const handleAddClick = () => {
    setShowAddForm(true);
    setShowEditForm(-1);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowEditForm(-1);
  };

  const handleAddExercise = (newExercise) => {
    addExercise(newExercise);
  };

  const handleEditExercise = (exercise, exerciseNumber) => {
    setShowEditForm(exerciseNumber);
    setShowAddForm(false);

    editExercise(exercise, exerciseNumber);
  };

  const handleDeleteExercise = (exerciseNumber) => {
    deleteExercise(exerciseNumber);
  };

  const exerciseCards = exercises.map((exercise, index) => {
    return (
      <div key={index} className="flex w-full flex-col items-center gap-3">
        <ExerciseAccordion
          exerciseNumber={index + 1}
          exercise={exercise}
          showForm={showEditForm === index + 1}
          handleEditExercise={handleEditExercise}
          handleCloseForm={handleCloseForm}
          handleDeleteExercise={handleDeleteExercise}
        />
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
