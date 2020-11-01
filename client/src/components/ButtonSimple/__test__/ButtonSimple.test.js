import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonSimple from "../ButtonSimple";
import { MemoryRouter } from "react-router-dom";

beforeEach(() =>
  render(<ButtonSimple route={"delivery"} textContent={"Get Started"} />, {
    wrapper: MemoryRouter,
  })
);
afterAll(() => cleanup());

test("Link button directs to specified route", () => {
  const button = screen.getByTestId("button-simple");

  expect(button).toHaveAttribute("href", "/delivery");
});

test("Button displays correct text content", () => {
  const button = screen.getByTestId("button-simple");

  expect(button).toHaveTextContent("Get Started");
});

test("Class 'hovered' implemented upon hover", () => {
  const button = screen.getByTestId("button-simple");

  userEvent.hover(button);
  expect(button).toHaveClass("hovered");

  userEvent.unhover(button);
  expect(button).not.toHaveClass("hovered");
});

// Test omitted due to library lacking onMouseDown/Up functionality
// test("Class 'clicked' implemented upon click", () => {
//   const button = screen.getByTestId("button-simple");

//   userEvent.click(button);

//   expect(button).toHaveClass("clicked");
// });
