"use client";

/**
 * React Bootstrap input text field with a label.  The entire structure
 * is wrapped in a <Form.Group> component.
 *
 * @packageDocumentation
 */

// External Modules ----------------------------------------------------------

import { clsx } from "clsx";
import { InputHTMLAttributes } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type InputGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  // Optional CSS classes to apply to the input field.
  className?: string;
  // Optional CSS classes to apply to the <Form.Group> component.
  groupClassName?: string;
  // Should the input field be disabled? [false]
  disabled?: boolean;
  // The label for the input field.
  label: string;
  // Optional CSS classes to apply to the label.
  labelClassName?: string;
  // The name of the input field.
  name: string;
  // Optional onBlur handler for the input field.
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  // Optional onChange handler for the input field.
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Optional placeholder text for the input field.
  placeholder?: string;
  // Optional size variant for the input field. [none, implying "md"]
  size?: "sm" | "lg";
  // Optional HTML type for the input field. [text]
  type?: string;
  // The value of the input field.  Must be a state variable.
  value: string | number | string[] | undefined;
  // Should the label and field be aligned vertically?  [false]
  vertical?: boolean;
}

export function InputGroup({
  className,
  disabled = false,
  groupClassName,
  label,
  labelClassName,
  name,
  onBlur,
  onChange,
  placeholder,
  size,
  type = "text",
  value,
  vertical = false,
  ...props
}: InputGroupProps) {

//  console.log(`Name: ${name} Value: ${value} Vertical: ${vertical}`);

  const InputElement =
    <Form.Control
      className={clsx(
        "w-full max-w-xs",
        "border-2 border-gray-500",
        "disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75",
        "ring-2 ring-gray-500 ring-opacity-50",
        {className},
      )}
      disabled={disabled}
      id={name}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder ? placeholder : undefined}
      size={size ? size : undefined}
      type={type}
      value={value}
      {...props}
    />;

  return (
    <Form.Group
      as={!vertical ? undefined : Row}
      className={`mb-3 ${groupClassName ? groupClassName : ""}`}
    >
      <Form.Label
        aria-label={label}
        className={`text-base ${labelClassName ? labelClassName : ""}`}
        column={!vertical ? true : undefined}
        htmlFor={name}
        sm={!vertical ? 3 : undefined}
      >
        {label}
      </Form.Label>
      {!vertical ? <Col sm={9}>{InputElement}</Col> : InputElement}
    </Form.Group>
  );

}
