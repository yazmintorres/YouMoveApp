import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  // get path
  const location = useLocation();
  console.log(location);

  return (
    <nav>
      <h1>Welcome to YouMove</h1>
      {location.pathname === "/" && <NavLink to="/login">Login</NavLink>}
      {location.pathname === "/login" && <NavLink to="/">Home</NavLink>}
      {location.pathname === "/register" && <NavLink to="/">Home</NavLink>}
      {/* {location.pathname === "/create" && <NavLink to="/create">Home</NavLink>} */}
    </nav>
  );
};

export default Navbar;
