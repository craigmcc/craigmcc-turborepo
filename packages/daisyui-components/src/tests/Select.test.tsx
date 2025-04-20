"use client";

/**
 * Tests for the Select component.
 */

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Select } from "../Select";

// Test Hooks ----------------------------------------------------------------

// Test Infrastructure -------------------------------------------------------

function elements(labelText: string) {
  const select = screen.getByLabelText(labelText);
  return {
    select,
  };
}

// Test Objects --------------------------------------------------------------

const LABEL = "Test Select";
const NAME = "test-select";
const OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const VALUE = "option2";

// Test Methods --------------------------------------------------------------

describe("Select", () => {
  it("should render a select field as expected", () => {
    const handleChange = jest.fn();
    render(
      <Select
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        options={OPTIONS}
        value={VALUE}
      />
    );
    const { select } = elements(LABEL);
    expect(select).toBeInTheDocument();
    expect(select).not.toHaveAttribute("disabled");
    expect(select).toHaveAttribute("id", NAME);
    expect(select).toHaveAttribute("name", NAME);
    expect(select).not.toHaveAttribute("onBlur");
    expect(select).not.toHaveAttribute("onChange");
  });

  it("should render a select field with className as expected", () => {
    const CLASSNAME = "test-class";
    const handleChange = jest.fn();
    render(
      <Select
        className={CLASSNAME}
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        options={OPTIONS}
        value={VALUE}
      />
    );
    const { select } = elements(LABEL);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("class", `select select-bordered w-full ${CLASSNAME}`);
  });

  it("should render a disabled select field as expected", () => {
    render(
      <Select
        disabled={true}
        label={LABEL}
        name={NAME}
        options={OPTIONS}
        value={VALUE}
      />
    );
    const { select } = elements(LABEL);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("disabled");
  });

  it("should render a select field with vertical layout as expected", () => {
    const handleChange = jest.fn();
    render(
      <Select
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        options={OPTIONS}
        value={VALUE}
        vertical={true}
      />
    );
    const { select } = elements(LABEL);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("class", "select select-bordered w-full ");
  });

  it("should render a select field with horizontal layout as expected", () => {
    const handleChange = jest.fn();
    render(
      <Select
        label={LABEL}
        name={NAME}
        onChange={handleChange}
        options={OPTIONS}
        value={VALUE}
        vertical={false}
      />
    );
    const { select } = elements(LABEL);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("class", "select select-bordered w-full ");
  });

});
