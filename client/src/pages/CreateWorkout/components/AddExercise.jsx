import React from "react";
import ExerciseCard from "@client/src/components/ExerciseCard/ExerciseCard";

const AddExercise = () => {
  return (
    <div className="flex w-full grow flex-col items-center gap-3">
      <ExerciseCard
        number={1}
        duration="this would be a duration (time)"
        name="push-ups"
        weight="bodyweight"
        sets={2}
        reps={10}
      />

      <ExerciseCard
        number={2}
        duration="this would be a duration (time)"
        name="push-ups"
        weight="bodyweight"
        sets={2}
        reps={10}
      />
      <div className="w-11/12 rounded-xl border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
        <div className="m-auto w-11/12 p-3">
          <h3 className=" my-4 text-lg font-bold ">Add Exercise</h3>
          <form className="flex flex-col gap-2">
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
                name="exercise-name"
                id="exercise-name"
                required
              ></input>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3  ">
              <label htmlFor="duration" className="w-1/5 basis-auto text-left">
                Duration
              </label>
              <input
                className="input-field w-20 basis-auto"
                type="number"
                name="minutes"
                placeholder="Minutes"
                id="duration"
              ></input>
              <p>:</p>
              <input
                className="input-field basis-auto sm:w-20"
                type="number"
                placeholder="Seconds"
                id="duration"
                name="seconds"
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
                placeholder="Pounds"
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
              ></input>
            </div>
            <button
              type="submit"
              className=" mt-4 self-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Add Exercise
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExercise;
