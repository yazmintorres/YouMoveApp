import React, { useContext, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import WorkoutContext from "@client/src/contexts/workout";

const ListExercises = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null);

  const { exercises } = useContext(WorkoutContext);

  const handleAddClick = () => {
    setShowAddForm(true);
    setShowEditForm(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowEditForm(null);
  };

  const handleEditExercise = (exerciseToEdit, number) => {
    console.log("edit this exercise");
    console.log(number);
    // setShowForm(true);
    setShowEditForm(number);
    setShowAddForm(false);
  };

  const exerciseCards = exercises.map((exercise, index) => {
    return (
      <div key={index} className="flex w-full flex-col items-center gap-3">
        <ExerciseCard
          key={index + 1}
          number={index + 1}
          exercise={exercise}
          handleEditExercise={handleEditExercise}
        />
        {showEditForm === index + 1 && (
          <ExerciseForm
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
      {showAddForm || (
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
      {showAddForm && <ExerciseForm handleCloseForm={handleCloseForm} />}
    </div>
  );
};

export default ListExercises;
