import React from "react";

const ExerciseCard = ({
  number,
  name,
  durationMinutes,
  durationSeconds,
  sets,
  reps,
  weight,
}) => {
  // sets and reps
  if (Number(sets) === 0) {
    sets = "";
  } else if (Number(durationMinutes) === 1) {
    sets = `1 set`;
  } else if (Number(sets) > 1) {
    sets = `${sets} sets`;
  }

  if (Number(reps) === 0) {
    reps = "";
  } else if (Number(reps) === 1) {
    reps = `1 rep`;
  } else if (Number(reps) > 1) {
    reps = `${reps} reps`;
  }

  let setsAndReps = "";
  if (sets && reps) {
    setsAndReps = `${sets} x ${reps}`;
  } else if (sets) {
    setsAndReps = sets;
  } else if (reps) {
    setsAndReps = reps;
  }

  // duration minutes and seconds
  if (Number(durationMinutes) === 0) {
    durationMinutes = "";
  } else if (Number(durationMinutes) === 1) {
    durationMinutes = `1 min`;
  } else if (Number(durationMinutes) > 1) {
    durationMinutes = `${durationMinutes} mins`;
  }

  if (Number(durationSeconds) === 0) {
    durationSeconds = "";
  } else if (Number(durationSeconds) === 1) {
    durationSeconds = `1 sec`;
  } else if (Number(durationSeconds) > 1) {
    durationSeconds = `${durationSeconds} secs`;
  }

  let minutesAndSeconds = "";
  if (durationMinutes && durationSeconds) {
    minutesAndSeconds = `${durationMinutes} ${durationSeconds} `;
  } else if (durationMinutes) {
    minutesAndSeconds = durationMinutes;
  } else if (durationSeconds) {
    minutesAndSeconds = durationSeconds;
  }

  // weight
  if (Number(weight) === 0) {
    weight = "";
  } else if (Number(weight) === 1) {
    weight = `1 lb`;
  } else if (Number(weight) > 1) {
    weight = `${weight} lbs`;
  }

  return (
    <div className=" w-11/12 rounded-lg border-2 border-solid border-black text-center sm:mt-0 sm:w-4/5">
      <div className="m-auto w-11/12 p-3">
        <div>
          <p className=" absolute text-xl font-bold ">{number}</p>
          <h3 className="my-0 grow font-bold">
            {name[0].toUpperCase() + name.slice(1)}
          </h3>
        </div>
        {minutesAndSeconds && <p>{minutesAndSeconds}</p>}
        {weight && <p>{weight}</p>}
        {setsAndReps && <p>{setsAndReps}</p>}
      </div>
    </div>
  );
};

export default ExerciseCard;
