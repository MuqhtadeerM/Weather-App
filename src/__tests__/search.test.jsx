import Search from "../Components/search";

import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

test("testing search", () => {
  render(<Search />);

  // Role Text Box
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();

  // check placeholder
  expect(input).toHaveAttribute("placeholder", "Enter City Name");

  //check name att

  expect(input).toHaveAttribute("name", "search");
});
