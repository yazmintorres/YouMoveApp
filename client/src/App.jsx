import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Routes from "@client/Routes";

const router = createBrowserRouter(createRoutesFromElements(Routes));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
