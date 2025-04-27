"use client";

/**
 * General purpose input field for the application.
 */

// External Modules ----------------------------------------------------------

import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type InputProps = {
  // Optional children to render inside the fieldset.
  children?: React.ReactNode;
  // Optional CSS classes to apply to the input field.
  className?: string;
  // Optional disabled state for the input field.
  disabled?: boolean;
  // The label for the input field.
  label: string;
  // HTML name (and id) of the input field.
  name: string;
  // Optional event handler for blur events.
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  // Optional event handler for change events.
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Optional placeholder text for the input field.
  placeholder?: string;
  // Optional HTML type for the input field. [text]
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  // Optional initial value for the input field.
  // This is a controlled input field, so must be stateful in the parent.
  value?: string | number | readonly string[] | undefined;
  // Should the label be displayed above the input field?
  vertical?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  children,
  className,
  disabled,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
  vertical,
  ...props
}: InputProps) {
  const fieldsetClassName = twMerge(
    "fieldset w-full",
    vertical ? "grid grid-cols-1" : "flex flex-row gap-1"
  );
  return (
    // prettier-ignore
    <fieldset className={fieldsetClassName}>
      {vertical ? (
        <legend className="fieldset-legend">
          <label htmlFor={name}>{label}</label>
        </legend>
      ) : (
        <label className="items-center p-2" htmlFor={name}>{label}</label>
      )}
      <input
        className={twMerge("input border-2 border-gray-500 w-full", className)}
        disabled={disabled ? disabled : undefined}
        id={name}
        name={name}
        onBlur={onBlur ? onBlur : undefined}
        onChange={onChange ? onChange : undefined}
        placeholder={placeholder ? placeholder : undefined}
        type={type ? type : "text"}
        value={value ? value : undefined}
        {...props}
      />
      {children}
    </fieldset>
  );
}
