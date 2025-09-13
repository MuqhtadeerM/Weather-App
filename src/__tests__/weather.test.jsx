import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Weather from "../Components/weather";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

globalThis.fetch = vi.fn();

test("loads and diplay weather data testing", async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({
      name: "bengauru",
      sys: { country: "IN" },
      main: { temp: 300, humidity: 70 },
      weather: [{ description: "clear sky" }],
      wind: { speed: 4 },
    }),
  });
  render(<Weather />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/bengauru/i)).toBeInTheDocument();
  });
});

test("Testing normal test", () => {
  render(<Weather />);
  const input = screen.getByRole("textbox");
  const btn = screen.getByRole("button", { name: /search/i });
  expect(input).toBeInTheDocument();
  expect(btn).toBeInTheDocument();
});

test("show Error", async () => {
  fetch.mockResolvedValueOnce(new Error("Falied to fetch"));

  render(<Weather />);
  await wait(() => {
    expect(screen.getByText(/error accured/i)).toBeInTheDocument();
  });
});
