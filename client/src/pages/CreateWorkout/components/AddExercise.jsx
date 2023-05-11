import React, { useEffect } from "react";
import ExerciseCard from "@client/src/components/ExerciseCard/ExerciseCard";
import { useState } from "react";

const AddExercise = ({ handleExerciseAdded }) => {
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({
    name: "",
    durationMinutes: "",
    durationSeconds: "",
    weight: "",
    reps: "",
    sets: "",
  });

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExercises((prevExercises) => [...prevExercises, exercise]);
    setExercise({
      name: "",
      durationMinutes: "",
      durationSeconds: "",
      weight: "",
      reps: "",
      sets: "",
    });
  };

  useEffect(() => {
    handleExerciseAdded(exercises);
  }, [exercises]);

  const exerciseCards = exercises.map((exercise, index) => (
    <ExerciseCard
      key={index + 1}
      number={index + 1}
      durationMinutes={exercise.durationMinutes}
      durationSeconds={exercise.durationSeconds}
      name={exercise.name}
      weight={exercise.weight}
      sets={exercise.sets}
      reps={exercise.reps}
    />
  ));

  return (
    <div className="w-11/12 rounded-xl border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
      <div className="m-auto w-11/12 p-3">
        <div className="my-4">
          <h3 className=" my-0 text-lg font-bold ">Add Exercise</h3>
          <p className="text-xs font-bold">(or a rest interval) </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3  ">
            <label
              htmlFor="exercise-name"
              className="w-1/5 basis-auto text-left"
            >
              Name*
            </label>
            <input
              className="input-field  "
              type="text"
              name="name"
              id="name"
              value={exercise.name}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3  ">
            <label htmlFor="duration" className="w-1/5 basis-auto text-left">
              Duration
            </label>

            <input
              className="input-field w-20  basis-auto"
              type="number"
              name="durationMinutes"
              min={0}
              max={30}
              placeholder="Minutes"
              onChange={handleChange}
              value={exercise.durationMinutes}
              id="duration"
            ></input>

            <p>:</p>

            <input
              className="input-field  basis-auto sm:w-20"
              type="number"
              placeholder="Seconds"
              id="duration"
              name="durationSeconds"
              value={exercise.durationSeconds}
              onChange={handleChange}
              min={0}
              max={60}
            ></input>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3  ">
            <label htmlFor="weight" className="w-1/5 basis-auto  text-left">
              Weight
            </label>
            <input
              className="input-field "
              type="number"
              name="weight"
              id="weight"
              value={exercise.weight}
              onChange={handleChange}
              min={0}
              placeholder="Pounds"
            ></input>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3  ">
            <label htmlFor="sets" className="w-1/5 basis-auto  text-left">
              Sets
            </label>
            <input
              className="input-field"
              type="number"
              name="sets"
              id="sets"
              min={0}
              value={exercise.sets}
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3  ">
            <label htmlFor="reps" className="w-1/5 basis-auto  text-left">
              Reps
            </label>
            <input
              className="input-field "
              type="number"
              name="reps"
              id="reps"
              value={exercise.reps}
              onChange={handleChange}
              min={0}
            ></input>
          </div>
          <button type="submit" className=" btn-actions mt-4 self-center">
            Add Exercise
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExercise;
