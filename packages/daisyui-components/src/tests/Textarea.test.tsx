"use client";

/**
 * Tests for the Textarea component.
 */

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { act } from "react";

// Internal Modules ----------------------------------------------------------

import { TextareaWrapper } from "./TextareaWrapper";
import { Textarea } from "../Textarea";

// Test Hooks ----------------------------------------------------------------

// Test Infrastructure -------------------------------------------------------

function elements(labelText: string) {
  const textarea = screen.getByLabelText(labelText);
  return {
    textarea,
  };
}

// Test Objects --------------------------------------------------------------

const CLASSNAME = "test-class";
const LABEL = "Test Textarea";
const NAME = "test-textarea";
const PLACEHOLDER = "Enter text here";
const UPDATED_VALUE = "Updated Value";
const VALUE = "Test Value";

// Test Methods --------------------------------------------------------------

describe("Textarea", () => {
  it("should render a textarea field as expected", () => {
    render(
      <Textarea
        className={CLASSNAME}
        disabled
        label={LABEL}
        name={NAME}
        onBlur={jest.fn()}
        onChange={jest.fn()}
        placeholder={PLACEHOLDER}
        value={VALUE}
        vertical
      />
    );

    const { textarea } = elements(LABEL);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("class", `textarea textarea-bordered w-full ${CLASSNAME}`);
    expect(textarea).toHaveAttribute("disabled");
    expect(textarea).toHaveAttribute("id", NAME);
    expect(textarea).toHaveAttribute("name", NAME);
    expect(textarea).not.toHaveAttribute("onBlur"); // Injected later
    expect(textarea).not.toHaveAttribute("onChange"); // Injected later
    expect(textarea).toHaveAttribute("placeholder", PLACEHOLDER);
    expect(textarea).toHaveTextContent(VALUE);
    // "vertical" is not an input element attribute
  });

  it("should trigger the onBlur event", async () => {
    const handleOnBlur = jest.fn();
    const handleChange = jest.fn();
    render(
      <TextareaWrapper
        defaultValue={VALUE}
        mockOnBlur={handleOnBlur}
        label={LABEL}
        name={NAME}
        onBlur={handleOnBlur}
        onChange={handleChange}
      />
    );
    const {textarea} = elements(LABEL);
    expect(textarea).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.clear(textarea); // Acquire focus
      await user.tab();
    });

    expect(handleOnBlur).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledTimes(1); // The "clear" event

  });

  it("should trigger the onChange event", async () => {
    const handleOnChange = jest.fn();
    render(
      <TextareaWrapper
        defaultValue={VALUE}
        mockOnChange={handleOnChange}
        label={LABEL}
        name={NAME}
        onChange={handleOnChange}
        value={VALUE}
      />
    );
    const {textarea} = elements(LABEL);
    expect(textarea).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.clear(textarea);
      await user.type(textarea, UPDATED_VALUE);
    });

    expect(handleOnChange).toHaveBeenCalledTimes(UPDATED_VALUE.length + 1); // The "clear"

  });

});
