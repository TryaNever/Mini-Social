/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext"; // adapte selon ton projet
import Home from "../src/pages/Home"; // chemin vers ta page Home

expect.extend(toHaveNoViolations);

const Wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe("Home page accessibility", () => {
  test("should have no accessibility violations", async () => {
    const { container } = render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
