"use client";

/**
 * Generic text field filter component.
 */

// External Modules ----------------------------------------------------------

import {
  Field,
//  FieldContent,
//  FieldDescription,
//  FieldError,
//  FieldGroup,
  FieldLabel,
//  FieldLegend,
//  FieldSeparator,
//  FieldSet,
//  FieldTitle,
} from "@repo/shadcn-ui/components/field";
import { Input } from "@repo/shadcn-ui/components/input";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type TextFieldFilterProps = {
  // Optional controlID for the filter [textFieldFilter]
  controlId?: string;
  // Optional label for the filter [Filter by Text: ]
  label?: string;
  // Optional placeholder for the text field [none]
  placeholder?: string;
  // Change the currently selected text filter value
  setTextFieldFilter: (value: string) => void;
  // The current value of the text field filter
  textFieldFilter: string;
}

export function TextFieldFilter({
  controlId = "textFieldFilter",
  label = "Filter by Text:",
  placeholder,
  setTextFieldFilter,
  textFieldFilter,
}: TextFieldFilterProps) {
  return (
    <Field>
      <FieldLabel htmlFor={controlId}>{label}</FieldLabel>
      <Input
        className="w-full"
        id={controlId}
        onChange={(e) => setTextFieldFilter(e.target.value)}
        placeholder={placeholder ? placeholder : undefined}
        value={textFieldFilter}
      />
    </Field>
  );
}
