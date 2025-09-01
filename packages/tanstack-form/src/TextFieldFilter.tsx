"use client";

/**
 * Generic text field filter component.
 */

// External Imports ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type TextFieldFilterProps = {
  // Optional CSS classes to append to the filter's classes
  className?: string;
  // ID of the filter field (must be unique on the page)
  controlId: string;
  // Text field ID (must be unique)
  id: string;
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
  className,
  controlId,
  label = "Filter by Text:",
  placeholder,
  setTextFieldFilter,
  textFieldFilter,
}: TextFieldFilterProps) {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">
        <label htmlFor={controlId}>{label}</label>
      </legend>
      <input
        className={className || undefined}
        id={controlId}
        name={controlId}
        onChange={(e) => setTextFieldFilter(e.target.value)}
        placeholder={placeholder || undefined}
        type="text"
        value={textFieldFilter}
      />
    </fieldset>
  );
}
