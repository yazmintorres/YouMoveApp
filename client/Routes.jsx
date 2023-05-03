// this file contains all the routes of my application
import { Outlet, Route } from "react-router-dom";

// pages
import Home from "@src/pages/Home/Home";
import Register from "./src/pages/Register/Register";
import Login from "./src/pages/Login/Login";
import CreateWorkout from "./src/pages/CreateWorkout/CreateWorkout";
import WorkoutCard from "./src/pages/WorkoutCard/WorkoutCard";
import Navbar from "./src/components/Navbar.jsx/Navbar";
import UserLanding from "./src/pages/UserLanding/UserLanding";

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const Routes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="create" element={<CreateWorkout />} />
    <Route path="card/:id" element={<WorkoutCard />} />
    <Route path="dashboard" element={<UserLanding />} />
  </Route>
);

export default Routes;
