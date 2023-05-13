import React, { useContext, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import WorkoutContext from "@client/src/contexts/workout";

const ListExercises = () => {
  const [exerciseToEdit, setExerciseToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);

  const { exercises } = useContext(WorkoutContext);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEditExercise = (exerciseToEdit) => {
    setShowForm(true);
    setExerciseToEdit(exerciseToEdit);
  };

  const exerciseCards = exercises.map((exercise, index) => {
    return (
      <ExerciseCard
        key={index + 1}
        number={index + 1}
        exercise={exercise}
        handleEditExercise={handleEditExercise}
      />
    );
  });

  return (
    <div className="flex w-full grow flex-col items-center gap-3">
      {" "}
      {exerciseCards}
      {showForm || (
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
      {showForm && (
        <ExerciseForm
          handleCloseForm={handleCloseForm}
          exerciseToEdit={exerciseToEdit}
          // handleExerciseAdded={handleExerciseAdded}
          // handleShowForm={handleShowForm}
        />
      )}
    </div>
  );
};

export default ListExercises;
