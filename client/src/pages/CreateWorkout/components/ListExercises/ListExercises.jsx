import React, { useContext } from "react";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import WorkoutContext from "@client/src/contexts/workout";

const ListExercises = () => {
  const { exercises } = useContext(WorkoutContext);

  const exerciseCards = exercises.map((exercise, index) => (
    <ExerciseCard
      key={index + 1}
      number={index + 1}
      exercise={exercise}
      // handleEditExercise={handleEditExercise}
      // handleDeleteExercise={handleDeleteExercise}
      // handleShowForm={handleShowForm}
    />
  ));

  return <>{exerciseCards}</>;
};

export default ListExercises;
