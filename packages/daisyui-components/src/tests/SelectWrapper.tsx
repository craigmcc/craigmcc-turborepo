"use client";

/**
 * Container component for testing the Select component.
 */

// External Modules ----------------------------------------------------------

import React, { useState } from "react";

// Internal Modules ----------------------------------------------------------

import {Select, SelectProps} from "../Select";

// Public Objects ------------------------------------------------------------

export type SelectWrapperProps = {
  // Optional initial value.  [""]
  defaultValue?: string;
  // Optional event handler for blur events (must be a jest.fn())
  mockOnBlur?: jest.Mock<void, [React.FocusEvent<HTMLSelectElement>]>;
  // Optional event handler for change events (must be a jest.fn())
  mockOnChange?: jest.Mock<void, [React.ChangeEvent<HTMLSelectElement>]>;
} & SelectProps;

export function SelectWrapper({ defaultValue, mockOnBlur, mockOnChange, ...props }:SelectWrapperProps) {
  const [value, setValue] = useState(defaultValue);
  if (mockOnBlur) {
    mockOnBlur.mockImplementation((event: React.FocusEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
    });
  }
  if (mockOnChange) {
    mockOnChange.mockImplementation((event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value);
    });
  }
  return (
    <Select
      onBlur={mockOnBlur}
      onChange={mockOnChange}
      value={value ? value : ""}
      {...props}
    />
  )

}
