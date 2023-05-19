import LoginButton from "./LoginButton";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// TEST THAT LOGIN BUTTON APPEARS ON THE SCREEN
test("login button is on screen", () => {
  render(<LoginButton />);
  const button = screen.getByRole("button");
  expect(button).toBeDefined();
});
