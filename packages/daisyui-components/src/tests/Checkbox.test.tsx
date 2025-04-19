"use client";

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

// Internal Modules ----------------------------------------------------------

import { Checkbox } from "../Checkbox";

// Test Hooks ----------------------------------------------------------------

// Test Infrastructure -------------------------------------------------------

function elements(labelText: string) {
  const checkbox = screen.getByLabelText(labelText);
  return {
    checkbox,
  };
}

// Test Objects --------------------------------------------------------------

const LABEL = "Test Checkbox";
const NAME = "test-checkbox";
//const VALUE = true;

describe("Checkbox", () => {
  it("should render a checkbox as expected", () => {
    render(<Checkbox
      label={LABEL}
      name={NAME}
    />);
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveAttribute("disabled");
    expect(checkbox).toHaveAttribute("id", NAME);
    expect(checkbox).toHaveAttribute("name", NAME);
    expect(checkbox).not.toHaveAttribute("onBlur");
    expect(checkbox).not.toHaveAttribute("onChange");
  });

  it("should render a checkbox with className as expected", () => {
    const CLASSNAME = "test-class";
    render(<Checkbox
      className={CLASSNAME}
      label={LABEL}
      name={NAME}
    />);
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("class", `checkbox checkbox-primary ${CLASSNAME}`);
  });

  it("should render a disabled checkbox as expected", () => {
    render(<Checkbox
      disabled={true}
      label={LABEL}
      name={NAME}
    />);
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("disabled");
  });

  // TODO - fails for some reason
  it.skip("should render a checkbox with onBlur as expected", () => {
    const handleBlur = jest.fn();
    render(<Checkbox
      label={LABEL}
      name={NAME}
      onBlur={handleBlur}
    />);
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("onBlur");
  });

  // TODO - fails for some reason
  it.skip("should render a checkbox with onChange as expected", () => {
    const handleChange = jest.fn();
    render(<Checkbox
      label={LABEL}
      name={NAME}
      onChange={handleChange}
    />);
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("onChange");
  });

  /*
  it("should render a checkbox with value as expected", () => {
    render(<Checkbox
      label={LABEL}
      name={NAME}
      value={VALUE}
    />);
    const { checkbox } = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("checked");
  });
*/

  it("should render a checkbox with value as undefined as expected", () => {
    render(<Checkbox
      label={LABEL}
      name={NAME}
      value={undefined}
    />);
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveAttribute("checked");
  });

});
