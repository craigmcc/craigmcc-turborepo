"use client";

// External Modules ----------------------------------------------------------

import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import React, { act } from "react";

// Internal Modules ----------------------------------------------------------

import { CheckboxWrapper } from "./CheckboxWrapper";
import { Checkbox } from "../Checkbox";
import { userEvent } from "@testing-library/user-event";

// Test Hooks ----------------------------------------------------------------

// Test Infrastructure -------------------------------------------------------

function elements(labelText: string) {
  const checkbox = screen.getByLabelText(labelText);
  return {
    checkbox,
  };
}

// Test Objects --------------------------------------------------------------

const CHECKED = false;
const CLASSNAME = "test-class";
const LABEL = "Test Checkbox";
const NAME = "test-checkbox";

describe("Checkbox", () => {
  it("should render a fully decorated Checkbox component", () => {
    render(<Checkbox
      checked={CHECKED}
      className={CLASSNAME}
      disabled
      label={LABEL}
      name={NAME}
      onBlur={jest.fn()}
      onChange={jest.fn()}
    />);
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();
    if (CHECKED) {
      expect(checkbox).toHaveAttribute("checked", CHECKED);
    } else {
      expect(checkbox).not.toHaveAttribute("checked");
    }
    expect(checkbox).toHaveAttribute("class", `checkbox checkbox-primary ${CLASSNAME}`);
    expect(checkbox).toHaveAttribute("disabled");
    expect(checkbox).toHaveAttribute("id", NAME);
    expect(checkbox).toHaveAttribute("name", NAME);
    expect(checkbox).not.toHaveAttribute("onBlur"); // Injected later
    expect(checkbox).not.toHaveAttribute("onChange"); // Injected later
  });

  it("should trigger the onBlur event", async () => {
    const handleOnBlur = jest.fn();
    const handleChange = jest.fn();
    render(
      <CheckboxWrapper
        defaultChecked={CHECKED}
        mockOnBlur={handleOnBlur}
        label={LABEL}
        name={NAME}
        onBlur={handleOnBlur}
        onChange={handleChange}
      />
    );
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.tab(); // Acquire focus
      await user.tab(); // Lose focus
    });

    expect(handleOnBlur).toHaveBeenCalledTimes(1);
    expect(handleChange).not.toHaveBeenCalled();

  });

  it("should trigger the onChange event", async () => {
    const handleOnChange = jest.fn();
    render(
      <CheckboxWrapper
        defaultChecked={CHECKED}
        mockOnChange={handleOnChange}
        label={LABEL}
        name={NAME}
        onChange={handleOnChange}
      />
    );
    const {checkbox} = elements(LABEL);
    expect(checkbox).toBeInTheDocument();

    const user = userEvent.setup();
    await act(async () => {
      await user.tab(); // Acquire focus
      await user.click(checkbox); // Click to change the value
    });

    expect(handleOnChange).toHaveBeenCalledTimes(1); // The "click" event

  });

});
