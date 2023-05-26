import ExerciseAccordion from "./ExerciseAccordion";
import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// TEST THAT THIS COMPONENT SHOWS THE EXERCISE NAME ON THE EXERCISE CARD
test("exercise cards show the title", () => {
  render(<ExerciseAccordion exercise={{ name: "exercise name" }} />);
  const header = screen.getByRole("heading", { name: "Exercise name" });
  // const header = screen.getByText("Exercise name");
  expect(header).toBeDefined();
});
