/**
 * Buttons example component
 */

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function Buttons() {
  return (
    <div className="grid grid-cols-2 border border-base-content bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th><h1>Style</h1></th>
            <th className="text-center"><h1>Buttons</h1></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plain</td>
            <td>
              {Array.from(COLOR_CLASSES.keys()).map((color) => (
                <button
                  key={color}
                  className={`btn ${COLOR_CLASSES.get(color)} m-2`}
                >
                  {color}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <td>Soft</td>
            <td>
              {Array.from(COLOR_CLASSES.keys()).map((color) => (
                <button
                  key={color}
                  className={`btn ${COLOR_CLASSES.get(color)} btn-soft m-2`}
                >
                  {color}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <td>Outline</td>
            <td>
              {Array.from(COLOR_CLASSES.keys()).map((color) => (
                <button
                  key={color}
                  className={`btn ${COLOR_CLASSES.get(color)} btn-outline m-2`}
                >
                  {color}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <td>Dashed</td>
            <td>
              {Array.from(COLOR_CLASSES.keys()).map((color) => (
                <button
                  key={color}
                  className={`btn ${COLOR_CLASSES.get(color)} btn-dash m-2`}
                >
                  {color}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td>
              {Array.from(COLOR_CLASSES.keys()).map((color) => (
                <button
                  key={color}
                  className={`btn ${COLOR_CLASSES.get(color)} btn-disabled m-2`}
                >
                  {color}
                </button>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <thead>
        <tr>
          <th><h1>Size</h1></th>
          <th className="text-center"><h1>Buttons</h1></th>
        </tr>
        </thead>
        <tbody>
        {Array.from(SIZE_CLASSES.keys()).map((size) => (
          <tr key={size}>
            <td>{size}</td>
            <td>
              {Array.from(COLOR_CLASSES.keys()).map((color) => (
                <button
                  key={`${color}-${size}`}
                  className={`btn ${COLOR_CLASSES.get(color)} ${SIZE_CLASSES.get(size)} m-2`}
                >
                  {color}
                </button>
              ))}
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
  ["Primary  ", "btn-primary"],
  ["Secondary", "btn-secondary"],
  ["Accent", "btn-accent"],
  ["Neutral", "btn-neutral"],
  ["Info", "btn-info"],
  ["Success", "btn-success"],
  ["Warning", "btn-warning"],
  ["Error", "btn-error"],
]);

const SIZE_CLASSES = new Map<string, string>([
  ["XSmall", "btn-xs"],
  ["Small", "btn-sm"],
  ["Medium", "btn-md"],
  ["Large", "btn-lg"],
  ["XLarge", "btn-xl"],
]);
