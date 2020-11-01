import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  cleanup
} from "@testing-library/react";

import NavbarM from "../NavbarM";

let navbarM;
let navbarMIconContainer;
let hamburger;

beforeEach(() => {
  render(<NavbarM />);
  navbarM = screen.getByTestId("navbarM");
  navbarMIconContainer = screen.getByTestId("icon-container");
  hamburger = screen.getByTestId("hamburger");
});

afterEach(() => cleanup());

test("NavbarM renders", () => {
  expect(navbarM).toBeInTheDocument();
});

test("Hamburger and icon color is off-white when in home", () => {
  expect(screen.getByAltText('pizza-icon')).toBeInTheDocument();
});


test("Hamburger disappear on first click. Arrow appears", () => {
  userEvent.click(navbarMIconContainer);
  expect(hamburger).toHaveClass('hide-hamburger')
  expect(screen.getByTestId("back-arrow")).not.toHaveClass('hide-back-arrow');
  expect(screen.getByTestId("back-arrow")).toHaveClass('back-arrow-container');
  
});

test("Hamburger appear on clicking arrow. Arrow disappears", () => {
  userEvent.dblClick(navbarMIconContainer);

  expect(hamburger).not.toHaveClass('hide-hamburger')
  expect(screen.getByTestId("back-arrow")).toHaveClass('hide-back-arrow');
});
