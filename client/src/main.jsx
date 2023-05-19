import React from "react";
import ReactDOM from "react-dom/client";
import "@src/index.css";
import App from "@src/App";
import Auth0ProviderWithNavigate from "./Auth0ProviderWithNavigate";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
