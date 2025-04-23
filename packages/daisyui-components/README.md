# packages/daisyui-components

## Introduction

This package contains React components that use styles
from the [DaisyUI](https://daisyui.com/) library (version 5+),
and the [Tailwind](https://tailwindcss.com) library (version 4+).

Although neither of these libraries is defined as a dependency
for this package, they must be installed and configured in any
application that uses this package.

## Installation—This Package

If you are building applications in the same monorepo that contains
this package (@craigmcc/craigmcc-turborepo), you can declare this
package as a dependency in the `package.json` file of your application.

```json
{
  "dependencies": {
    "@craigmcc/daisyui-components": "workspace:*"
  }
}
```

Otherwise, you will need this package to be published to the NPM registry,
and you will need to install it from there.

In either case, your application will also need to declare *react* and
*react-dom* as dependencies.

## Installation-DaisyUI and Tailwind

To install the DaisyUI and Tailwind libraries, follow the instructions
on the corresponding websites.  Be sure you install and configure
Tailwind 4+ and DaisyUI 5+.
* [Tailwind](https://tailwindcss.com/docs/installation)
* [DaisyUI](https://daisyui.com/docs/install/)

## Input Component Usage

TODO: describe Checkbox, Input, Select, and Textarea components.

## Theme Component Usage

TODO: describe how to use ThemeContext, ThemeSwitcher, and ThemeWrapper.
