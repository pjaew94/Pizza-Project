import React from "react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { render, waitFor, screen, cleanup } from "@testing-library/react";
import App from "./App";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByTestId("home-title")).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByTestId('button-simple'), leftClick)

//   expect(screen.getByTestId('delivery-pickup')).toBeInTheDocument() 
});
