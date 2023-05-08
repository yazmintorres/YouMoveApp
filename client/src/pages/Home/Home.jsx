import React from "react";
import { Link } from "react-router-dom";
import SignupButton from "@client/src/components/SignUpButton/SignUpButton";

const Home = () => {
  return (
    <div className="m-auto flex h-96 max-w-md flex-col items-center justify-center gap-6">
      <h2 className="text-center">
        Curate a workout playlist just for you to make hittin' the gym next time
        that much easier 💯
      </h2>
      <ul className="">
        <li>⭐️ Browse workout videos from YouTube</li>
        <li>⭐️ Easily take notes on the exercises involved</li>
        <li>⭐️ Save the workout for easy future reference</li>
        {/* <li>⭐️ Create a personal playlist of awesome workouts</li> */}
      </ul>
      <SignupButton />
    </div>
  );
};

export default Home;
