# Package @craigmcc/daisyui-config

## Overview

> **Note**:
> If you have (or will) use a template to create a new app in this
> monorepo (such as a Next.js app), you may want to create the
> *globals.css* file (or whatever name you want) with a different
> name or a different location, to avoid overwriting what the template
> created for Tailwind support.

This package has the following purposes:
* Provide a prebuilt *globals.css* file for a basic Tailwind CSS setup,
    with DaisyUI installed as well.  You do not need to utilize
    *packages/tailwind-config* if you are using this package,
    because it includes the same required Tailwind configuration
    that package, plus what DaisyUI requires.
* Provide a prebuilt *postcss.config.mjs* file that must be included
    in the root of the project. (either using a dependency or via copy/paste).
* Provide prespecified versions of the Tailwind and DaisyUI dependencies so that
    any app or package depending on this package will always use the same versions.

## Installation

(1) In the *package.json* file for your app or package, include the following:

##### File: `package.json`

```json
{
  "devDependencies": {
    "@craigmcc/daisyui-config": "workspace:*"
  },
  "dependencies": {
    "daisyui": "latest"
    }
}
```

(2) In the root directory of your app or package, set up a *postcss.config.mjs* file
with the following contents, if not already present:

##### File: `postcss.config.mjs`

```javascript
export { default } from "@craigmcc/daisyui-config/postcss.config";
```

(3) Then, in the *src/app* directory of your app or package (or wherever you want it),
create a *globals.css* file (or whatever name you want) with the following
contents (this will include the required Tailwind *@import* statement):

##### File: `src/app/globals.css`

```css
@import "@craigmcc/daisyui-config/globals.css";

/* Include whatever other CSS configuration you want here */
```
Users who wish to customize their DaisyUI plugin configuration may prefer to just
cut-and-paste the contents of @craigmcc/daisyui-config/globals.css into their own
*globals.css* file, and then modify the configuration as needed.

(4) Finally, include a reference to the *globals.css* file in your app or package.
For a Next.js app, for example, you might include it in the *src/app/layout.tsx* file
if it is in the same directory:

##### File: `src/app/layout.tsx`

```tsx
import "./globals.css";
```
