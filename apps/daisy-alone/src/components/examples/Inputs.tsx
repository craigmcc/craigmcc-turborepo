/**
 * Inputs example component.
 */

// External Modules ----------------------------------------------------------

import clsx from "clsx";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function Inputs() {
  return (
    <div className="grid grid-cols-2 border border-base-content bg-base-100">
      <table className="table">
        <thead>
        <tr>
          <th className="text-center"><h1>Horizontal</h1></th>
        </tr>
        </thead>
        <tbody>
        {Array.from(COLOR_CLASSES.keys()).map((color) => (
          <tr key={color}>
            <td>
              <HorizontalInput
                color={color}
                label="Input Label"
                message="Error message"
                placeholder={`${color} placeholder`}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <table className="table">
        <thead>
        <tr>
          <th className="text-center"><h1>Vertical</h1></th>
        </tr>
        </thead>
        <tbody>
        {Array.from(COLOR_CLASSES.keys()).map((color) => (
          <tr key={color}>
            <td>
              <VerticalInput
                color={color}
                label="Input Label"
                message="Error message"
                placeholder={`${color} placeholder`}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

// Private Objects -----------------------------------------------------------

const COLOR_CLASSES = new Map<string, string>([
  ["Primary  ", "input-primary"],
  ["Secondary", "input-secondary"],
  ["Accent", "input-accent"],
  ["Neutral", "neutral"],
  ["Info", "input-info"],
  ["Success", "input-success"],
  ["Warning", "input-warning"],
  ["Error", "input-error"],
]);

const SIZE_CLASSES = new Map<string, string>([
  ["XSmall", "input-xs"],
  ["Small", "input-sm"],
  ["Medium", "input-md"],
  ["Large", "input-lg"],
  ["XLarge", "input-xl"],
]);

type HorizontalInputProps = {
  // Color name (if any)
  color?: string;
  // Field label
  label: string;
  // Error message (if any)
  message?: string;
  // Placeholder text (if any)
  placeholder?: string;
  // Size name (if any)
  size?: string;
}

function HorizontalInput({ color, label, message, placeholder, size }: HorizontalInputProps) {
  const inputClassNames = clsx(
    "input w-full max-w-xs",
    color ? COLOR_CLASSES.get(color) : null,
    size ? SIZE_CLASSES.get(size) : null,
  );

  return (
    <div className="grid grid-cols-2 border border-base-content bg-base-200">
      <legend className="fieldset-legend p-2">
        {label}
      </legend>
      <div className="p-2">
        <input type="text" placeholder={placeholder} className={inputClassNames} />
        {message && <p className="label text-error">{message}</p>}
      </div>
    </div>
  );
}

type VerticalInputProps = {
  // Color name (if any)
  color?: string;
  // Field label
  label: string;
  // Error message (if any)
  message?: string;
  // Placeholder text (if any)
  placeholder?: string;
  // Size name (if any)
  size?: string;
}

function VerticalInput({ color, label, message, placeholder, size }: VerticalInputProps) {

  const inputClassNames = clsx(
    "input w-full max-w-xs",
    color ? COLOR_CLASSES.get(color) : null,
    size ? SIZE_CLASSES.get(size) : null,
    "px-2",
  );

  return (
    <div className="fieldset border border-base-content bg-base-200">
      {label && <legend className="fieldset-legend p-2">{label}</legend>}
      <input type="text" placeholder={placeholder} className={inputClassNames} />
      {message && <p className="label text-error px-2">{message}</p>}
    </div>
  );

}
