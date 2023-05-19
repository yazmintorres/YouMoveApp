import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SignupButton from "./SignUpButton";

// TEST THAT LOGIN BUTTON APPEARS ON THE SCREEN
test("sign up button is on screen", () => {
  render(<SignupButton />);
  const button = screen.getByRole("button");
  expect(button).toBeDefined();
});
