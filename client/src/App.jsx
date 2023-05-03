import { Routes, Route, Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// pages
import Navbar from "./components/Navbar/Navbar";
import Home from "@pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreateWorkout from "./pages/CreateWorkout/CreateWorkout";
import WorkoutCard from "./pages/WorkoutCard/WorkoutCard";
import UserLanding from "./pages/UserLanding/UserLanding";

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main className="m-auto w-11/12">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="create" element={<CreateWorkout />} />
        <Route path="card/:id" element={<WorkoutCard />} />
        <Route path="dashboard" element={<UserLanding />} />
      </Route>
    </Routes>
  );
}

export default App;
