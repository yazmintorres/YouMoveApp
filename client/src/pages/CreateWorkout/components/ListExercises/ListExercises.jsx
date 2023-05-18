import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import Accordion from "../Accordion";

const ListExercises = ({
  exercises,
  addExercise,
  editExercise,
  deleteExercise,
}) => {
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
    addExercise(newExercise);
  };

  const handleEditExercise = (exercise) => {
    setShowEditForm(exercise.id);
    setShowAddForm(false);

    editExercise(exercise);
  };

  const handleDeleteExercise = (exerciseId) => {
    deleteExercise(exerciseId);
  };

  const exerciseCards = exercises.map((exercise, index) => {
    // const [showForm, setShowForm] = useState(false);
    // if (showEditForm === exercise.id) setShowForm(true);
    return (
      <div key={index} className="flex w-full flex-col items-center gap-3">
        <Accordion
          exercise={exercise}
          showForm={showEditForm === exercise.id}
          handleEditExercise={handleEditExercise}
          handleCloseForm={handleCloseForm}
        />
        {/* <ExerciseCard
          exercise={exercise}
          handleEditExercise={handleEditExercise}
          handleDeleteExercise={handleDeleteExercise}
        />
        {showEditForm === exercise.id && (
          <ExerciseForm
            exerciseToEdit={exercise}
            handleCloseForm={handleCloseForm}
            handleAddExercise={handleAddExercise}
            handleEditExercise={handleEditExercise}
          />
        )} */}
      </div>
    );
  });

  // const exerciseCards = exercises.map((exercise, index) => {
  //   return (
  //     <div key={index} className="flex w-full flex-col items-center gap-3">
  //       <ExerciseCard
  //         exercise={exercise}
  //         handleEditExercise={handleEditExercise}
  //         handleDeleteExercise={handleDeleteExercise}
  //       />
  //       {showEditForm === exercise.id && (
  //         <ExerciseForm
  //           exerciseToEdit={exercise}
  //           handleCloseForm={handleCloseForm}
  //           handleAddExercise={handleAddExercise}
  //           handleEditExercise={handleEditExercise}
  //         />
  //       )}
  //     </div>
  //   );
  // });

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
