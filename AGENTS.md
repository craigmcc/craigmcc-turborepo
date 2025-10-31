# AGENTS.md for craigmcc-turborepo

This is a monorepo, based on [TurboRepo](https://turborepo.build), containing several
applications and shareable packages primarily built by Craig McClanahan.  Source code
is stored on [GitHub](https://github.com/craigmcc/craigmcc-turborepo).

## Technology Stack
- [NodeJS](https://nodejsl.org) Runtime execution environment.
- [NextJS](https://nextjs.org) Application framework.
- [Typescript](https://www.typescriptlang.org) Predominant programming language.
- [Prisma](https://www.prisma.io) Object relational model for database access.
- [PostgreSQL](https://www.postgresql.org) Relational database.
- [ESLint](https://eslint.org) Linting framework.
- [NextAuth](https://next-auth.js.org) Authentication framework #1.
- [BetterAuth](https://www.better-auth.com) Authentication framework #2.
- [React](https://react.dev) UI component framework.
- [TailwindCSS](https://tailwindcss.com) Primary CSS styling library.
- [ShadCN](https://ui.shadcn.com) Secondary CSS styling library (and components) #1.
- [DaisyUI](https://daisyui.com) Secondary CSS styling library #2.
- [Tanstack Form](https://tanstack.com/form/latest) React component library for forms.
- [Tanstack Table](https://tanstack.com/table/latest) React component library for tables.
- [Zod](https://zod.dev) Schema validation library.
- [Lucide](https://lucide.dev) Icon library.
- [Vitest](https://vitest.dev) Testing framework.

## Overall Organization

This monorepo follows the recommended organization from TurboRepo.
Of particular note - the version numbers for all external dependencies
MUST be stored in `pnpm-workspace.yaml` at the top level.  This allows
the `package.json` file in the various apps and packages to declare
a dependency with a value like `catalog:tanstack` instead of an actual
version number.  In this way, all apps and packages that use the same
dependency will be picking up the same version, and updating to a new
version is very simple.

TODO: list the apps and packages?

## Syntax Guidelines for Code and Configuration Files

### `package.json` files

- Alphabetize elements in ascending ASCII order.
- For sections that have sub-elements (such as `dependencies`), alphabetize the sub-elements as well.
- The `name` element for an app MUST be the same as the name of the directory for that app.
- The `name` element for a package MUST be `@repo/{name}`, where {name} is the directory for that package.

### Source File General Rules

- Filenames should be in Upper Camel Case (i.e. camel case with a leading capital letter).
- The base filename should match the primary exported object, if there is one.
- Named exports MUST be used, except where default exports are required (such as a `page.tsx` file for a Next.js endpoint).
- The named export for a React component must start with a capital letter (React rule).
- All Typescript source files MUST be in the `src` directory of the owning app or package,
  except for configuration files that must be at the top level.
- Within the `src` directory, modules SHOULD be organized into subdirectories
  by type and/or purpose if there are many of them.
 
### Typescript Module Source Code Rules

#### General Module Rules

Each module SHOULD have the following elements:
- `"use client"` or `"use server"` at the top, for client side React components or React Server Actions, respectively.
- A general comment about the content of this module.
- (Optional) A section labelled *External Modules*, containing import statements for all
  external modules (either third party dependencies, or modules from the `packages` directory of this repo).
  Imports MUST be in ascending order based on the name after "from".
- (Optional) A section labelled *Internal Modules*, containing dependent modules from the same app, if any.
  Imports MUST be sorted in ascending order based on the name after "from".
- A section labelled *Public Objects* containing objects that are to be exported for use by other modules.
- (Optional) A section labelled *Private Objects* containing objects that are not exported.

#### React Component Additional Rules

- Components that accept properties SHOULD declare a `{name}Props` type at the top of the
  *Public Objects* section, above the function itself.  Each defined property SHOULD have a
  short (// ...) comment above it, which improves developer experience in IDEs.  Use [...]
  to describe default values if an optional property is not passed. Available
  properties SHOULD be sorted alphabetically.
- Declaring the `{name}Props` type to be exported is optional, because Typescript will implicitly export it because of its use in the
  component declaration itself.
- The component itself should be declared as `export function {Name}` (React requires upper case for component names).
- The arguments passed to the component should be spread, from a type matching the `{name}Props` values.
- Liberal use of blank lines between logical sections of the function body improves readability.

An example of a component declaration might look like this for a *DataTable* component:

```ts
type DataTableProps<TData> = {
  // Show pagination controls? [false]
  showPagination?: boolean;
  // The Tanstack Table we are displaying
  table: TanstackTable<TData>
}

export function DataTable<TData>(
  {
    showPagination,
    table,
  }: DataTableProps<TData>) {
    // functional logic of this component
  }
```

In this particular case, the component itself (and therefore its properties) is generified
by the *<TData>* modifier.  That will only be required when the functional logic requires it.

