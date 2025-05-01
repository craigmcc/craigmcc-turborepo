"use client";

/**
 * Experimental version of Input to explore approaches that do the borders right.
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

export function Input1({
  children,
  className,
  disabled,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
  value,
  vertical,
  ...props
}: InputProps) {
  return (
    <div className={twMerge( // Faked fieldset
      "w-full gap-1",
      vertical ? "grid grid-cols-1" : "flex flex-row",
    )}>
      <div className={twMerge( // Faked legend
        "items-center",
        !vertical ? "pr-2" : null,
      )}>
        <label
          className={twMerge(
            !vertical ? "gap-1" : null,
          )}
          htmlFor={name}>{label}</label>
      </div>
      <input // Faked input
        className={twMerge(
          "w-full input",
//          "border-2 border-amber-500 rounded-field",
//          "input input-border flex w-full items-center gap-2 grow",
          className,
        )}
        disabled={disabled ? disabled : undefined}
        id={name}
        name={name}
        onBlur={onBlur ? onBlur : undefined}
        onChange={onChange ? onChange : undefined}
        placeholder={placeholder ? placeholder : undefined}
        type={type}
        value={value ? value : undefined}
        {...props}
      />
      {children}
    </div>
  );
}
