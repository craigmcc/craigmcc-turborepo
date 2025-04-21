"use client";

/**
 * Container component for testing the Input component.
 */

// External Modules ----------------------------------------------------------

import React, { useState } from "react";

// Internal Modules ----------------------------------------------------------

import {Input, InputProps} from "../Input";

// Public Objects ------------------------------------------------------------

export type InputWrapperProps = {
  // Optional initial value.  [""]
  defaultValue?: string;
  // Optional event handler for blur events (must be a jest.fn())
  mockOnBlur?: jest.Mock<void, [React.FocusEvent<HTMLInputElement>]>;
  // Optional event handler for change events (must be a jest.fn())
  mockOnChange?: jest.Mock<void, [React.ChangeEvent<HTMLInputElement>]>;
} & InputProps;

export function InputWrapper({ defaultValue, mockOnBlur, mockOnChange, ...props }:InputWrapperProps) {
  const [value, setValue] = useState(defaultValue);
  if (mockOnBlur) {
    mockOnBlur.mockImplementation((event: React.FocusEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    });
  }
  if (mockOnChange) {
    mockOnChange.mockImplementation((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    });
  }
  return (
    <Input
      onBlur={mockOnBlur}
      onChange={mockOnChange}
      value={value ? value : ""}
      {...props}
    />
  )

}
