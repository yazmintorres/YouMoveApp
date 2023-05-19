import ExerciseAccordion from "./ExerciseAccordion";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// TEST THAT THIS COMPONENT SHOWS THE EXERCISE NAME ON THE EXERCISE CARD
test("exercise cards show the title", () => {
  render(<ExerciseAccordion exercise={{ name: "exercise name" }} />);
  const header = screen.getByRole("heading", { name: "Exercise name" });
  // const header = screen.getByText("Exercise name");
  expect(header).toBeDefined();
});

// TEST THAT FORM OPENS ON EDIT CLICK
test("show form on edit click", () => {
  render(<ExerciseAccordion exercise={{ name: "exercise name" }} />);
  const button = screen.getByRole("button", { name: "edit" });
});

//   it("should show form on edit click", async () => {
//     render(<ExerciseCard exercise={{ name: "Exercise Name" }} />);
//     const button = screen.getByRole("button", { name: "edit" });
//     await userEvent.click(button);
//     expect(screen.getByRole("form", { name: "exercise-form" }));
//   });
// });
