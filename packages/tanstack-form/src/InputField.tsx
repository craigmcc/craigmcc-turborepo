"use client";

/**
 * TanStack Form input field for a text field with a label.
 */

// External Modules ----------------------------------------------------------

import { InputHTMLAttributes } from "react";

// Internal Modules ----------------------------------------------------------

import { FieldErrors } from "./FieldErrors";
import { useFieldContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

type Props = {
  // Optional CSS classes to apply to the input field.
  className?: string,
  // The label for the input field.
  label: string,
  // Optional placeholder text for the input field.
  placeholder?: string,
  // Optional HTML type for the input field. [text]
  type?: string,
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({ className, label, placeholder, type, ...props }: Props) {

  const field = useFieldContext<string>();


  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">
        <label htmlFor={field.name}>{label}</label>
      </legend>
      <input
        className={`input input-bordered w-full ${className ? className : ""}`}
        id={field.name}
        name={field.name}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder ? placeholder : undefined}
        type={type ? type : "text"}
        value={field.state.value}
        {...props}
      />
      <FieldErrors field={field} />
    </fieldset>
/*
    <>
      <Input
        className={className ? className : ""}
        id={field.name}
        label={label}
        name={field.name}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder ? placeholder : undefined}
        type={type ? type : "text"}
        value={field.state.value}
        {...props}
      />
      <FieldErrors field={field} />
    </>
*/
  );

}
