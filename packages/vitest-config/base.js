/**
 * Vitest base configuration for all packages.
 */

// External Dependencies -----------------------------------------------------

import { defineConfig } from "vitest/config";

// Internal Dependencies -----------------------------------------------------

export const baseConfig = defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: [
        ["html", {dir: `../coverage`}],
//        ["json", {file: `../coverage.json`}],
      ],
      enabled: true,
    },
  },
});
