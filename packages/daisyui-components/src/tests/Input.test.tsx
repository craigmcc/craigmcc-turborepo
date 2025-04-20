"use client";

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import {/* act,*/ fireEvent, render, screen } from "@testing-library/react";
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

const CLASSNAME = "test-class";
const LABEL = "Test Input";
const NAME = "test-input";
const PLACEHOLDER = "Enter text here";
const VALUE = "Test Value";

describe("Input", () => {
  it("should render a fully decorated Input field", () => {
    render(<Input
      className={CLASSNAME}
      disabled
      label={LABEL}
      name={NAME}
      onBlur={jest.fn()}
      onChange={jest.fn()}
      placeholder={PLACEHOLDER}
      type="text"
      value={VALUE}
      vertical
    />);
    const { input } = elements(LABEL);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("class", `input input-bordered w-full ${CLASSNAME}`);
    expect(input).toHaveAttribute("disabled");
    expect(input).toHaveAttribute("id", NAME);
    expect(input).toHaveAttribute("name", NAME);
    expect(input).not.toHaveAttribute("onBlur"); // Injected later
    expect(input).not.toHaveAttribute("onChange"); // Injected later
    expect(input).toHaveAttribute("placeholder", PLACEHOLDER);
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("value", VALUE);
    // "vertical" is not an input element attribute
  });

  // TODO - does not fire event right now - need state  for the value?
  it.skip("should trigger the onChange event", () => {
    const handleChange = jest.fn();
    const UPDATED_VALUE = "Updated Value";
    render(
      <Input
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        value={VALUE}
      />
    );
    const {input} = elements(LABEL);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, UPDATED_VALUE);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(UPDATED_VALUE);
    expect(input).toHaveAttribute("value", UPDATED_VALUE)
  });

});
