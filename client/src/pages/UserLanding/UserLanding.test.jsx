import { BrowserRouter } from "react-router-dom";
import UserLanding from "./UserLanding";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// TEST THAT MY USER LANDING RENDERS CORRECTLY
test("user landing page renders correctly", () => {
  render(
    <BrowserRouter>
      <UserLanding />
    </BrowserRouter>
  );
  const userLandingPage = screen.getByTestId("landing");
  expect(userLandingPage).toBeDefined();
});
