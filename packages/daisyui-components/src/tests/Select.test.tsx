"use client";

/**
 * Tests for the Select component.
 */

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { act } from "react";

// Internal Modules ----------------------------------------------------------

import { SelectWrapper } from "./SelectWrapper";
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

const CLASSNAME = "test-class";
const LABEL = "Test Select";
const NAME = "test-select";
const OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const UPDATED_VALUE = "option3";
const VALUE = "option2";

// Test Methods --------------------------------------------------------------

describe("Select", () => {
  it("should render a fully decorated select component", () => {
    render(
      <Select
        className={CLASSNAME}
        disabled
        label={LABEL}
        name={NAME}
        onBlur={jest.fn()}
        onChange={jest.fn()}
        options={OPTIONS}
        value={VALUE}
        vertical
      />
    );

    const {select} = elements(LABEL);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("class", `select select-bordered w-full ${CLASSNAME}`);
    expect(select).toHaveAttribute("disabled");
    expect(select).toHaveAttribute("id", NAME);
    expect(select).toHaveAttribute("name", NAME);
    expect(select).not.toHaveAttribute("onBlur");
    expect(select).not.toHaveAttribute("onChange");
    expect(select).not.toHaveAttribute("value", VALUE); // Controlled component
    // "vertical" is not a select element attribute

  });

  it.skip("should trigger the onBlur event", async () => {
    const handleOnBlur = jest.fn();
    const handleChange = jest.fn();
    render(
      <SelectWrapper
        defaultValue={VALUE}
        mockOnBlur={handleOnBlur}
        label={LABEL}
        name={NAME}
        onBlur={handleOnBlur}
        onChange={handleChange}
        options={OPTIONS}
      />
    );
    const {select} = elements(LABEL);
    expect(select).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.tab(); // Acquire focus
      await user.tab(); // Trigger a blur event
    });

    expect(handleOnBlur).toHaveBeenCalledTimes(1);

  });

  it("should trigger the onChange event", async () => {
    const handleOnChange = jest.fn();
    render(
      <SelectWrapper
        defaultValue={VALUE}
        mockOnChange={handleOnChange}
        label={LABEL}
        name={NAME}
        onChange={handleOnChange}
        options={OPTIONS}
        value={VALUE}
      />
    );
    const {select} = elements(LABEL);
    expect(select).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.selectOptions(select, UPDATED_VALUE); // Select the option
    });

    expect(handleOnChange).toHaveBeenCalledTimes(1);

  });

});
