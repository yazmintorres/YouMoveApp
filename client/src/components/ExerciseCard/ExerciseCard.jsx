import React from "react";

const ExerciseCard = ({ number, name, duration, sets, reps, weight }) => {
  return (
    <div className=" w-11/12 rounded-xl border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
      <div className="m-auto w-11/12 p-3">
        <div>
          <p className=" absolute text-xl font-bold ">{number}</p>
          <h3 className="my-0 grow font-bold">{name}</h3>
        </div>

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
