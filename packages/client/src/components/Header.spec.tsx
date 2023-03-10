import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Header } from "./Header";

describe("Header", () => {
  it("renders title", () => {
    render(<Header onDrawerOpen={() => null} />);

    expect(screen.getByRole("heading", { name: "Sanakirja" })).toBeInTheDocument();
  });
});
