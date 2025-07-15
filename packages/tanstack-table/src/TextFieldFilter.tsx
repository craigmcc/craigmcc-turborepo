"use client";

/**
 * Generic text field filter component.
 */

// External Imports ----------------------------------------------------------

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
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">
        <label htmlFor={controlId}>{label}</label>
      </legend>
      <input
        className="input input-bordered w-full"
        id={controlId}
        name={controlId}
        onChange={(e) => setTextFieldFilter(e.target.value)}
        placeholder={placeholder ? placeholder : undefined}
        type="text"
        value={textFieldFilter}
      />
    </fieldset>
  );
}
