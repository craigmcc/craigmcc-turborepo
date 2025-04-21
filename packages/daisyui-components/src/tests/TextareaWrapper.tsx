"use client";

/**
 * Container component for testing the Textarea component.
 */

// External Modules ----------------------------------------------------------

import React, { useState } from "react";

// Internal Modules ----------------------------------------------------------

import {Textarea, TextareaProps} from "../Textarea";

// Public Objects ------------------------------------------------------------

export type TextareaWrapperProps = {
  // Optional initial value.  [""]
  defaultValue?: string;
  // Optional event handler for blur events (must be a jest.fn())
  mockOnBlur?: jest.Mock<void, [React.FocusEvent<HTMLTextAreaElement>]>;
  // Optional event handler for change events (must be a jest.fn())
  mockOnChange?: jest.Mock<void, [React.ChangeEvent<HTMLTextAreaElement>]>;
} & TextareaProps;

export function TextareaWrapper({ defaultValue, mockOnBlur, mockOnChange, ...props }:TextareaWrapperProps) {
  const [value, setValue] = useState(defaultValue);
  if (mockOnBlur) {
    mockOnBlur.mockImplementation((event: React.FocusEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    });
  }
  if (mockOnChange) {
    mockOnChange.mockImplementation((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    });
  }
  return (
    <Textarea
      onBlur={mockOnBlur}
      onChange={mockOnChange}
      value={value ? value : ""}
      {...props}
    />
  )

}
