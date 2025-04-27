"use client";

/**
 * General purpose selector for the application.
 */

// External Modules ----------------------------------------------------------

import React, { ChangeEvent, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type SelectOption = {
  // The label of the option.
  label: string;
  // The value of the option. By convention, a value of "" is used
  // to mark an option to be disabled, and not selectable. This is handy
  // if you need a "placeholder" like option at the top of the list.
  value: string;
};

export type SelectProps = {
  // Optional children to render inside the fieldset.
  children?: React.ReactNode;
  // Optional CSS classes to apply to the select field.
  className?: string;
  // Optional disabled state for the select field.
  disabled?: boolean;
  // The label for the select field.
  label: string;
  // HTML name (and id) of the select field.
  name: string;
  // Optional event handler for blur events.
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  // Optional event handler for change events.
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  // The options for the select field (including header if any).
  options: SelectOption[];
  // Optional initial value for the select field.
  // This is a controlled select field, so must be stateful in the parent.
  value?: string | number | readonly string[] | undefined;
  // Should the label be displayed above the select field?
  vertical?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
  children,
  className,
  disabled,
  label,
  name,
  onBlur,
  onChange,
  options,
  value,
  vertical,
  ...props
}: SelectProps) {

  const fieldsetClassName = twMerge(
    "fieldset w-full",
    vertical ? "grid grid-cols-1" : "flex flex-row gap-1"
  );

  return (
    <fieldset className={fieldsetClassName}>
      {vertical ? (
        <legend className="fieldset-legend">
          <label htmlFor={name}>{label}</label>
        </legend>
      ) : (
        <label className="items-center p-2" htmlFor={name}>{label}</label>
      )}
      <select
        className={twMerge("select select-bordered w-full", className)}
        disabled={disabled ? disabled : undefined}
        id={name}
        name={name}
        onBlur={onBlur ? onBlur : undefined}
        onChange={onChange ? onChange : undefined}
        value={value ? value : undefined}
        {...props}
      >
        {options.map((option) => (
          <option
            disabled={option.value === ""}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {children}
    </fieldset>
  );
}
