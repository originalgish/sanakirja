import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

const TestComponent = () => (
  <div>
    <button type="button">My button</button>
    <p>Some text</p>
  </div>
);

describe("Header", () => {
  it("dummy test", () => {
    render(<TestComponent />);
    expect(screen.getByText(/text/)).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "My button" });
    userEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
