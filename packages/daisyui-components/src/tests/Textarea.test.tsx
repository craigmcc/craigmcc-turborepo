"use client";

/**
 * Tests for the Textarea component.
 */

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

// Internal Modules ----------------------------------------------------------

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

const LABEL = "Test Textarea";
const NAME = "test-textarea";
const PLACEHOLDER = "Enter text here";
const VALUE = "Test Value";

// Test Methods --------------------------------------------------------------

describe("Textarea", () => {
  it("should render a textarea field as expected", () => {
    const handleChange = jest.fn();
    render(
      <Textarea
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        value={VALUE}
      />
    );
    const { textarea } = elements(LABEL);
    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toHaveAttribute("disabled");
    expect(textarea).toHaveAttribute("id", NAME);
    expect(textarea).toHaveAttribute("name", NAME);
    expect(textarea).not.toHaveAttribute("onBlur");
    expect(textarea).not.toHaveAttribute("onChange");
    expect(textarea).toHaveAttribute("placeholder", PLACEHOLDER);
    expect(textarea).toHaveTextContent(VALUE);
  });

  it("should render a textarea field with className as expected", () => {
    const CLASSNAME = "test-class";
    const handleChange = jest.fn();
    render(
      <Textarea
        className={CLASSNAME}
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        value={VALUE}
      />
    );
    const { textarea } = elements(LABEL);
    expect(textarea).toHaveClass(CLASSNAME);
  });

  it("should render a disabled textarea field as expected", () => {
    render(
      <Textarea
        disabled={true}
        label={LABEL}
        name={NAME}
        placeholder={PLACEHOLDER}
        value={VALUE}
      />
    );
    const { textarea } = elements(LABEL);
    expect(textarea).toBeDisabled();
  });

  it("should render a textarea field with vertical layout as expected", () => {
    const handleChange = jest.fn();
    render(
      <Textarea
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        value={VALUE}
        vertical={true}
      />
    );
    const { textarea } = elements(LABEL);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("id", NAME);
    expect(textarea).toHaveAttribute("name", NAME);
  });

  // TODO: Cannot seem to render onBlur and onChange events
  it.skip("should render a textarea field with onBlur and onChange event as expected", () => {
    const handleBlur = jest.fn();
    const handleChange = jest.fn();
    render(
      <Textarea
        label={LABEL}
        name={NAME}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        value={VALUE}
      />
    );
    const { textarea } = elements(LABEL);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("onBlur");
    expect(textarea).toHaveAttribute("onChange");
  });

});
