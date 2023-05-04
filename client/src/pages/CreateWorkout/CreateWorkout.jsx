import React from "react";
import VideoCard from "@client/src/components/VideoCard/VideoCard";

const CreateWorkout = () => {
  return (
    <div>
      <h2 className=" my-4 text-2xl font-bold tracking-wide">Add Workout</h2>
      <div className="flex">
        <div className="flex grow-[1] flex-col gap-11">
          <VideoCard sourceId="YJPSR9dEQV8" />
          <form className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="target-area">Target Area*</label>
              <select
                className="input-field"
                name="target-area"
                id="target-area"
                required
              >
                <option value="full-body">Full Body</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="rest-interval">Rest Interval</label>
              <input
                className="input-field"
                type="number"
                name="minutes"
                placeholder="Minutes"
                id="rest-interval"
              ></input>
              <p>:</p>
              <input
                className="input-field"
                type="number"
                placeholder="Seconds"
                id="rest-interval"
                name="seconds"
              ></input>
            </div>
          </form>
        </div>
        <div className="flex grow-[3] flex-col items-center">
          <p>Exercise cards will go here</p>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
