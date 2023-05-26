import React, { useContext, useEffect } from "react";
import { MdHighlightOff } from "react-icons/md";
import { useState } from "react";

const ExerciseForm = ({
  exerciseNumber,
  handleCloseForm,
  exerciseToEdit,
  handleAddExercise,
  handleEditExercise,
}) => {
  const [exercise, setExercise] = useState(
    exerciseToEdit || {
      name: "",
      durationMinutes: "",
      durationSeconds: "",
      weight: "",
      reps: "",
      sets: "",
      // setsCompleted: [],
      // exerciseCompleted: [],
    }
  );

  const handleChange = (e) => {
    setExercise((prevExercise) => ({
      ...prevExercise,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (exerciseToEdit) {
      handleEditExercise(exercise, exerciseNumber);
    } else {
      handleAddExercise(exercise);
    }
    setExercise({
      name: "",
      durationMinutes: "",
      durationSeconds: "",
      weight: "",
      reps: "",
      sets: "",
    });
    handleCloseForm();
  };

  return (
    <form
      aria-label="exercise-form"
      onSubmit={handleSubmit}
      className=" w-full rounded-lg border-2 border-solid border-black text-center text-lg md:mt-0 md:w-4/5 "
    >
      <div className="m-auto flex w-11/12 flex-col gap-2">
        <div className="relative my-4">
          <h3 className=" my-0 text-xl font-bold ">
            {exerciseToEdit ? "Edit Exercise" : "Add Exercise"}
          </h3>
          <p className="text-sm font-bold">
            {" "}
            {exerciseToEdit ? "(or rest interval)" : "(or a rest interval)"}
          </p>
          <MdHighlightOff
            onClick={() => handleCloseForm()}
            className="absolute right-1 top-1 text-3xl"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3  ">
          <label htmlFor="exercise-name" className="w-1/5 basis-auto text-left">
            Name*
          </label>
          <input
            className="input-field  "
            type="text"
            name="name"
            id="name"
            value={exercise.name}
            onChange={handleChange}
            maxLength={35}
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
            value={exercise.durationMinutes}
            placeholder="Minutes"
            onChange={handleChange}
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
          <label htmlFor="sets" className=" w-1/5 basis-auto  text-left">
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
          <label htmlFor="reps" className=" w-1/5 basis-auto  text-left">
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
        <button type="submit" className=" btn-actions my-4 self-center px-4">
          {exerciseToEdit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;
