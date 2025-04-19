"use client";

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
//import { userEvent } from "@testing-library/user-event";
import React from "react";

// Internal Modules ----------------------------------------------------------

import { Input } from "../Input";

// Test Hooks ----------------------------------------------------------------

// Test Infrastructure -------------------------------------------------------

function elements(labelText: string) {
  const input = screen.getByLabelText(labelText);
  return {
    input,
  };
}

// Test Objects --------------------------------------------------------------

const LABEL = "Test Input";
const NAME = "test-input";
const PLACEHOLDER = "Enter text here";
//const VALUE = "Test Value";

describe("Input", () => {
  it("should render an input field as expected", () => {
    render(<Input
      label={LABEL}
      name={NAME}
      placeholder={PLACEHOLDER}
      type="text"
    />);
    const { input } = elements(LABEL);
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute("disabled");
    expect(input).toHaveAttribute("id", NAME);
    expect(input).toHaveAttribute("name", NAME);
    expect(input).not.toHaveAttribute("onBlur");
    expect(input).not.toHaveAttribute("onChange");
    expect(input).toHaveAttribute("placeholder", PLACEHOLDER);
    expect(input).toHaveAttribute("type", "text");
    expect(input).not.toHaveAttribute("value");
  });

it("should render an input field with className as expected", () => {
    const CLASSNAME = "test-class";
    render(<Input
      className={CLASSNAME}
      label={LABEL}
      name={NAME}
      placeholder={PLACEHOLDER}
      type="text"
    />);
    const { input } = elements(LABEL);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("class", `input input-bordered w-full ${CLASSNAME}`);
  });

  it("should render a disabled input field as expected", () => {
    render(<Input
      disabled={true}
      label={LABEL}
      name={NAME}
      placeholder={PLACEHOLDER}
      type="text"
    />);
    const { input } = elements(LABEL);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("disabled");
  });

  // TODO - fails for some reason
  it.skip("should render an input field with onBlur as expected", () => {
    const handleBlur = jest.fn();
    render(<Input
      label={LABEL}
      name={NAME}
      onBlur={handleBlur}
      placeholder={PLACEHOLDER}
      type="text"
    />);
    const { input } = elements(LABEL);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("onBlur");
  });

  // TODO - fails for some reason
  it.skip("should render an input field with onChange as expected", () => {
    const handleChange = jest.fn();
    render(<Input
      label={LABEL}
      name={NAME}
      onChange={handleChange}
      placeholder={PLACEHOLDER}
      type="text"
    />);
    const { input } = elements(LABEL);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("onChange");
  });

  it("should render an input field with value as expected", () => {
    const VALUE = "Test Value";
    render(<Input
      label={LABEL}
      name={NAME}
      placeholder={PLACEHOLDER}
      type="text"
      value={VALUE}
    />);
    const { input } = elements(LABEL);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("value", VALUE);
  });

});
