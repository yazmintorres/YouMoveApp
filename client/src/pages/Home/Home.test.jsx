import Home from "./Home";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// TEST THAT MY HOME RENDERS CORRECTLY
test("Navbar renders correctly", () => {
  render(<Home />);
  const homeElement = screen.getByTestId("home");
  expect(homeElement).toBeDefined();
});
