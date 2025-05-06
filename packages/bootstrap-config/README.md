# Package @craigmcc/bootstrap-config

## Overview

This package has the following purposes:
* Provide prespecified versions of the Bootstrap and React-Bootstrap dependencies so that
    any app or package depending on this package will always use the same versions.
* Provide a *bootstrap.css* export that allows you to incorporate the base
    Bootstrap CSS styles into your app or package.

## Installation

(1) In the *package.json* file for your app or package, include the following:

##### File: `package.json`

```json
{
  "devDependencies": {
    "@craigmcc/bootstrap-config": "workspace:*"
  },
  "dependencies": {
    "bootstrap": "^5",
    "react-bootstrap": "^2"
  }
}
```

(2) Because React Bootstrap does not include the Bootstrap CSS styles by default,
    you will need to include the necessary styles in your application's global CSS file.
    For a Next.js app, it would typically be done like this:

##### File: `src/app/globals.css`

```css
@import "@craigmcc/bootstrap-config/bootstrap.css";
/* Include whatever other CSS configuration you want here */
```

(3) Utilize the prebuilt React Bootstrap components in your app or package.
    For example, you can use the following code to create a simple
    React-Bootstrap button:

##### File: `src/app/page.js`

```javascript
import Button from "react-bootstrap/Button";
```

> **Note**: It is also possible to say `import { Button } from "react-bootstrap";`
> instead, but this will cause the entire React Bootstrap library to be included
> in your app or package, which may be undesirable.  The above method only includes
> the specific component you are using.

