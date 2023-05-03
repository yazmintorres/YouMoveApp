import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  // get path
  const location = useLocation();
  console.log(location);

  return (
    <nav className=" bg-gradient-to-r from-blue-600 to-violet-600 p-4 tracking-wider text-white ">
      <div className="m-auto flex w-11/12 flex-wrap items-center">
        <h1 className="grow-[2] text-center text-3xl font-bold">
          Welcome to <span className="tracking-widest">YouMove</span>
        </h1>
        <div className=" grow-[1] basis-48 text-center ">
          {location.pathname === "/" && (
            <Link
              className="w-10 border-b-2 border-solid border-white"
              to="/login"
            >
              Login
            </Link>
          )}
          {location.pathname === "/login" && <NavLink to="/">Home</NavLink>}
          {location.pathname === "/register" && <NavLink to="/">Home</NavLink>}
          {/* {location.pathname === "/create" && <NavLink to="/create">Home</NavLink>} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
