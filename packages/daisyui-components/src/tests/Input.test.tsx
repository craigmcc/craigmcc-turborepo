"use client";

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { act } from "react";

// Internal Modules ----------------------------------------------------------

import { InputWrapper } from "./InputWrapper";
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
const UPDATED_VALUE = "Updated Value";
const VALUE = "Test Value";

describe("Input", () => {
  it("should render a fully decorated Input component", () => {
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
    const CLASSES = input.getAttribute("class")?.split(" ");
    expect(CLASSES).toContain(CLASSNAME);
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

  it("should trigger the onBlur event", async () => {
    const handleOnBlur = jest.fn();
    const handleChange = jest.fn();
    render(
      <InputWrapper
        defaultValue={VALUE}
        mockOnBlur={handleOnBlur}
        label={LABEL}
        name={NAME}
        onBlur={handleOnBlur}
        onChange={handleChange}
      />
    );
    const {input} = elements(LABEL);
    expect(input).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.clear(input); // Acquire focus
      await user.tab();
    });

    expect(handleOnBlur).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledTimes(1); // The "clear" event

  });

  it("should trigger the onChange event", async () => {
    const handleOnChange = jest.fn();
    render(
      <InputWrapper
        defaultValue={VALUE}
        mockOnChange={handleOnChange}
        label={LABEL}
        name={NAME}
        onChange={handleOnChange}
        value={VALUE}
      />
    );
    const {input} = elements(LABEL);
    expect(input).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.clear(input);
      await user.type(input, UPDATED_VALUE);
    });

    expect(handleOnChange).toHaveBeenCalledTimes(UPDATED_VALUE.length + 1); // The "clear"

  });

});
