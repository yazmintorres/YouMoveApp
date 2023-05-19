import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// TEST THAT MY NAVBAR RENDERS CORRECTLY
test("Navbar renders correctly", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const navbarElement = screen.getByTestId("navbar");
  expect(navbarElement).toBeDefined();
});
