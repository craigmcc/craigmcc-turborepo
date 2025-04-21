"use client";

/**
 * General purpose checkbox field for the application.
 */

// External Modules ----------------------------------------------------------

import React, { InputHTMLAttributes } from "react";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type CheckboxProps = {
  // Optional incoming value of the checkbox field.  This is used instead
  // of "value" on a checkbox but serves the same purpose.
  // This is a controlled checkbox field, so must be stateful in the parent.
  checked?: boolean;
  // Optional children to render inside the fieldset.
  children?: React.ReactNode;
  // Optional CSS classes to apply to the checkbox field.
  className?: string;
  // Optional disabled state for the checkbox field.
  disabled?: boolean;
  // The label for the checkbox field.
  label: string;
  // HTML name (and id) of the checkbox field.
  name: string;
  // Optional event handler for blur events.
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  // Optional event handler for change events.
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
  checked,
  children,
  className,
  disabled,
  label,
  name,
  onBlur,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <fieldset className={"fieldset w-full grid grid-cols-2 gap-1"}>
      <input
        checked={checked}
        className={`checkbox checkbox-primary ${className ? className : ""}`}
        disabled={disabled ? disabled : undefined}
        id={name}
        name={name}
        onBlur={onBlur ? onBlur : undefined}
        onChange={onChange ? onChange : undefined}
        type="checkbox"
        {...props}
      />
      <legend className="fieldset-legend">
        <label htmlFor={name}>{label}</label>
      </legend>
      {children}
    </fieldset>
  );
}
