import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import {
    render,
    screen,
    cleanup,
    getByTestId
  } from "@testing-library/react";
import NavbarM from '../../NavbarM/NavbarM';
import NavigatorM from '../NavigatorM';

let navigator;
let navbarMIconContainer;

beforeEach(() => {
    render(<NavbarM />);
    render(<NavigatorM />);
    navigator = screen.getByTestId("navigator");
    navbarMIconContainer = screen.getByTestId("icon-container");
})

afterEach(() => cleanup());

test("Navigator is rendered" , () => {
    expect(navigator).toBeInTheDocument();
    expect(screen.getByTestId('navbarM')).toBeInTheDocument();
})

test("Navigator appears when hamburger is clicked", () => {
    userEvent.click(navbarMIconContainer);
    expect(navigator).toHaveClass('show-navigator')
  });
  
test("Navigator disappears when arrow is clicked", () => {
    userEvent.dlclick(navbarMIconContainer);
    expect(navigator).not.toHaveClass('show-navigator')
  });