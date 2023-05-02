// this file contains all the routes of my application
import { Route } from "react-router-dom";

// pages
import Home from "@src/pages/Home/Home";
import Register from "./src/pages/Register/Register";
import Login from "./src/pages/Login/Login";
import CreateWorkout from "./src/pages/CreateWorkout/CreateWorkout";
import WorkoutCard from "./src/pages/WorkoutCard/WorkoutCard";

const Routes = (
  <Route path="/">
    <Route index element={<Home />} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="create" element={<CreateWorkout />} />
    <Route path="card/:id" element={<WorkoutCard />} />
  </Route>
);

export default Routes;
