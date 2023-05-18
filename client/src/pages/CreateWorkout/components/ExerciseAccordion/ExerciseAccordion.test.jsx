import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import ExerciseCard from "./ExerciseAccordion";

describe("Exercise Card", () => {
  it("renders exercise card", () => {
    render(<ExerciseCard exercise={{ name: "Exercise name" }} />);

    expect(
      screen.getByRole("heading", { name: "Exercise name" })
    ).toBeDefined();
  });

  it("should show form on edit click", async () => {
    render(<ExerciseCard exercise={{ name: "Exercise Name" }} />);
    const button = screen.getByRole("button", { name: "edit" });
    await userEvent.click(button);
    expect(screen.getByRole("form", { name: "exercise-form" }));
  });
});
