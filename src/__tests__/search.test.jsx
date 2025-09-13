import Search from "../Components/search";

import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("testing search and user input data", async () => {
  //creating mock function
  const mockSearch = vi.fn();
  const mockHandleSearch = vi.fn();
  render(
    <Search search="" setSearch={mockSearch} handleSearch={mockHandleSearch} />
  );

  // Role Text Box
  const input = screen.getByRole("textbox");
  const btn = screen.getByRole("button", { name: /search/i });

  expect(input).toBeInTheDocument();
  expect(btn).toBeInTheDocument();

  // check placeholder
  expect(input).toHaveAttribute("placeholder", "Enter City Name");

  //check name att
  expect(input).toHaveAttribute("name", "search");

  // initial value should be
  expect(input).toHaveValue("");

  // simulate usertyping
  await userEvent.type(input, "Bengaluru");
  await userEvent.click(btn);
  expect(mockSearch).toHaveBeenCalled("Bengaluru".length);
  expect(mockHandleSearch).toHaveBeenCalledTimes(1);
});
