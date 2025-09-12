import Search from "../Components/search";

import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

test("testing search", () => {
  render(<Search />);
  const search = screen.getByRole("textbox");
  expect(search).toBeInTheDocument();
});
