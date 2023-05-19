import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// TEST THAT MY APP RENDERS CORRECTLY
test("App renders", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const navbarElement = screen.getByTestId("app");
  expect(navbarElement).toBeDefined();
});
