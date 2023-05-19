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

// NOT WORKING
// TEST THAT FORM OPENS ON EDIT CLICK
// test("show form on edit click", () => {
//   render(<ExerciseAccordion exercise={{ name: "exercise name" }} />);
//   const form = screen.queryByRole("form");
//   const button = screen.getByRole("button", { name: "edit" });
//   expect(form).toBeNull();
//   fireEvent.click(button);
//   expect(form).toBeInTheDocument();
// });

// describe("exercise accordion", () => {
//   it("should show form on edit click", async () => {
//     render(<ExerciseAccordion exercise={{ name: "Exercise Name" }} />);
//     const button = screen.getByRole("button", { name: "edit" });
//     await userEvent.click(button);
//     expect(screen.getByRole("form", { name: "exercise-form" }));
//   });
// });
