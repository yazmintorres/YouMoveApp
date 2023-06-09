import { Routes, Route, Outlet } from "react-router-dom";
// pages
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CreateWorkout from "./pages/CreateWorkout/CreateWorkout";
import UserLanding from "./pages/UserLanding/UserLanding";

const Layout = () => {
  return (
    <div data-testid="app" className="layout">
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
        <Route path="workout" element={<CreateWorkout />} />
        <Route path="dashboard" element={<UserLanding />} />
      </Route>
    </Routes>
  );
}

export default App;
