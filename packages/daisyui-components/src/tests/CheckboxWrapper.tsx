"use client";

/**
 * Container component for testing the Checkbox component.
 */

// External Modules ----------------------------------------------------------

import React, { useState } from "react";

// Internal Modules ----------------------------------------------------------

import {Checkbox, CheckboxProps} from "../Checkbox";

// Public Objects ------------------------------------------------------------

export type CheckboxWrapperProps = {
  // Optional initial value.  [""]
  defaultChecked?: boolean | undefined;
  // Optional event handler for blur events (must be a jest.fn())
  mockOnBlur?: jest.Mock<void, [React.FocusEvent<HTMLInputElement>]>;
  // Optional event handler for change events (must be a jest.fn())
  mockOnChange?: jest.Mock<void, [React.ChangeEvent<HTMLInputElement>]>;
} & CheckboxProps;

export function CheckboxWrapper({ defaultChecked, mockOnBlur, mockOnChange, ...props }:CheckboxWrapperProps) {
  const [checked, setChecked] = useState<boolean | undefined>(defaultChecked);
  if (mockOnBlur) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockOnBlur.mockImplementation((event: React.FocusEvent<HTMLInputElement>) => {
    });
  }
  if (mockOnChange) {
    mockOnChange.mockImplementation((event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    });
  }
  return (
    <Checkbox
      checked={checked}
      onBlur={mockOnBlur}
      onChange={mockOnChange}
      {...props}
    />
  )

}
