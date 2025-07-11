/**
 * Cards example component.
 */

// External Modules ----------------------------------------------------------

import clsx from "clsx";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function Cards() {
  return (
    <div className="grid grid-cols-3 border border-base-content bg-base-100">

      <table className="table">
        <thead>
          <tr>
            <th><h1>Border</h1></th>
            <th className="text-center"><h1>Cards</h1></th>
          </tr>
        </thead>
        <tbody>
          {Array.from(BORDER_CLASSES.keys()).map((border) => (
            <tr key={border}>
              <td>{border}</td>
              <td className="text-center">
                <SimpleCard border={border} color={"Base-200"}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table">
        <thead>
          <tr>
            <th><h1>Color</h1></th>
            <th className="text-center"><h1>Cards</h1></th>
          </tr>
        </thead>
        <tbody>
          {Array.from(COLOR_CLASSES.keys()).map((color) => (
            <tr key={color}>
              <td>{color}</td>
              <td className="text-center">
                <SimpleCard color={color} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table">
        <thead>
          <tr>
            <th><h1>Size</h1></th>
            <th className="text-center"><h1>Cards</h1></th>
          </tr>
        </thead>
        <tbody>
          {Array.from(SIZE_CLASSES.keys()).map((size) => (
            <tr key={size}>
              <td>{size}</td>
              <td className="text-center">
                <SimpleCard border="Solid" color="Base-300" size={size} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

// Private Objects -----------------------------------------------------------

const BORDER_CLASSES = new Map<string, string>([
  ["None", ""],
  ["Dashed", "card-dash"],
  ["Solid", "card-border"],
]);

const COLOR_CLASSES = new Map<string, string>([
  ["Base-100", "bg-base-100 text-base-content"],
  ["Base-200", "bg-base-200 text-base-content"],
  ["Base-300", "bg-base-300 text-base-content"],
  ["Primary  ", "bg-primary text-primary-content"],
  ["Secondary", "bg-secondary text-secondary-content"],
  ["Accent", "bg-accent text-accent-content"],
  ["Neutral", "bg-neutral text-neutral-content"],
  ["Info", "bg-info text-info-content"],
  ["Success", "bg-success text-success-content"],
  ["Warning", "bg-warning text-warning-content"],
  ["Error", "bg-error text-error-content"],
]);

const SIZE_CLASSES = new Map<string, string>([
  ["XSmall", "card-xs"],
  ["Small", "card-sm"],
  ["Medium", "card-md"],
  ["Large", "card-lg"],
  ["XLarge", "card-xl"],
]);

type SimpleCardProps = {
  // Border name (if any)
  border?: string;
  // Color name (if any)
  color?: string;
  // Size name (if any)
  size?: string;
}

export function SimpleCard({ border, color, size }: SimpleCardProps) {

  const cardClassNames = clsx(
    "card w-96",
    border ? BORDER_CLASSES.get(border) : null,
    color ? COLOR_CLASSES.get(color) : null,
    size ? SIZE_CLASSES.get(size) : null,
  );

  return (
    <div className={cardClassNames}>
      <div className="card-body">
        <h2 className="card-title">Simple Card Title</h2>
        <p>A card component has (optinally) a title, a body part, and (optionally) an action part.</p>
        <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
