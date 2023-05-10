import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  // get path
  const location = useLocation();
  // console.log(location);

  return (
    <nav className=" bg-gradient-to-r from-blue-600 to-violet-600  py-4 tracking-wider text-white ">
      <div className="m-auto flex w-11/12 flex-wrap items-center gap-3 sm:gap-0 ">
        <h1 className="my-0 grow-[1] text-center text-3xl font-bold sm:text-left">
          Welcome to <span className="">YouMove</span>
        </h1>
        <div className=" flex  grow-[2] basis-52 justify-center gap-2 text-center sm:justify-end">
          {isAuthenticated && location.pathname !== "/dashboard" && (
            <Link className="btn" to="/dashboard">
              Your Workouts
            </Link>
          )}
          {isAuthenticated && <LogoutButton />}
          {!isAuthenticated && <LoginButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
