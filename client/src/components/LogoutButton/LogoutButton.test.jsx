import { LogoutButton } from "./LogoutButton";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// TEST THAT LOGOUT BUTTON APPEARS ON THE SCREEN
test("logout button is on screen", () => {
  render(<LogoutButton />);
  const button = screen.getByRole("button");
  expect(button).toBeDefined();
});
