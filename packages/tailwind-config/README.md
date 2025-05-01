# Package @craigmcc/tailwind-config

## Overview

> **Note**:
> If you have (or will) use a template to create a new app in this
> monorepo (such as a Next.js app), you will want to create the
> *globals.css* file (or whatever name you want) with a different
> name or a different location, to avoid overwriting what the template
> created for Tailwind support.

This package has the following purposes:
* Provide a prebuilt *globals.css* file for a basic Tailwind CSS setup.
* Provide a prebuilt *postcss.config.mjs* file that must be included
    in the root of the project. (either using a dependency or via copy/paste).
* Provide prespecified versions of the Tailwind dependencies so that
    any app or package depending on this package will always use the same versions.

If you wish to use a Tailwind CSS setup that has been preconfigured for
a particular component library (such as Daisy UI or Shadcn UI), you
should use the corresponding configuration package instead; they will
include the Tailwind configuration, plus the extra configuration needed
by that particular package.

## Installation

(1) In the *package.json* file for your app or package, included the following:

##### File: `package.json`

```json
{
  "dependencies": {
    "@craigmcc/tailwind-config": "workspace:*",
    "tailwindcss": "^3.3.2",
    "autoprefixer": "^10.4.14"
  },
  "devDependencies": {
    "@craigmcc/tailwind-config": "workspace:*"
  }
}
```

(2) In the root directory of your app or package, set up a *postcss.config.mjs* file
with the following contents:

##### File: `postcss.config.mjs`

```javascript
export { default } from "@craigmcc/tailwind-config/postcss.config";
```

(3) Then, in the *src/app* directory of your app or package (or wherever you want it),
create a *globals.css* file (or whatever name you want) with the following
contents:

##### File: `src/app/globals.css`

```css
@import "@craigmcc/tailwind-config/globals.css";

/* Include whatever other CSS configuration you want here */
```

(4) Finally, include a reference to the *globals.css* file in your app or package.
For a Next.js app, for example, you might include it in the *src/app/layout.tsx* file
if it is in the same directory:

##### File: `src/app/layout.tsx`

```tsx
import "./globals.css";
```
