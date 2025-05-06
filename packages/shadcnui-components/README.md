# packages/shadcnui-components

## Introduction

This package contains React components that are based on the ShadCN-UI library
(the component names that replace ShadCN versions will be prefixed with "My"),
plus some additional ones based on the same styles.

## Installation—This Package

If you are building applications in the same monorepo that contains
this package (@craigmcc/craigmcc-turborepo), you can declare this
package as a dependency in the `package.json` file of your application.

```json
{
  "dependencies": {
    "@craigmcc/shadcnui-components": "workspace:*"
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
