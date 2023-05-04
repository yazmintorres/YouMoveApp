import React from "react";

const ExerciseCard = ({ number, name, duration, sets, reps, weight }) => {
  return (
    <div className="mt-4 w-11/12 rounded-xl border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
      <div className="m-auto w-11/12 p-3">
        <p>{number}</p>
        <h3>{name}</h3>
        {duration && <p>{duration}</p>}
        {reps && sets && (
          <p>
            {" "}
            {sets} sets x {reps} reps
          </p>
        )}
        {weight && <p>{weight} lbs</p>}
      </div>
    </div>
  );
};

export default ExerciseCard;
