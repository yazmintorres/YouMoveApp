import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";

const Navbar = () => {
  // get path
  const location = useLocation();
  console.log(location);

  return (
    <nav className=" bg-gradient-to-r from-blue-600 to-violet-600 p-4 tracking-wider text-white ">
      <div className="m-auto flex w-11/12 flex-wrap items-center gap-3 sm:gap-0 ">
        <h1 className="grow-[1] text-center text-3xl font-bold sm:text-left">
          Welcome to <span className="tracking-widest">YouMove</span>
        </h1>
        <div className=" flex  grow-[2] basis-52 justify-center text-center sm:justify-end ">
          <LoginButton />
          {location.pathname === "/login" && (
            <Link className="btn" to="/">
              Home
            </Link>
          )}
          {location.pathname === "/register" && (
            <Link className="btn" to="/">
              Home
            </Link>
          )}
          {location.pathname === "/dashboard" && (
            <Link className="btn" to="/">
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
