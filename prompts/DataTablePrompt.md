First, review the AGENTS.md file at the top of this repository for general guidelines,
and ask for clarifications if necessary.

Next, consider class packages/shadcn-tanstack-table/src/DataTable.tsx - our objective
will be to add new functionality as follows:
- The application using this component should be able to pass an additional (optional)
  property of "actions", which is an array of "action" objects as described next.
- An "action" should be able to specify a label, an optional icon, and
  a function to execute if this action is selected.
- The argument to the function will be the row (of type Row<TData>) for the current
  row when the action is triggered.
- If "actions" are passed in, the DataTable component will add an additional column
  at the end of each row.  The header for this column will be "Actions".  The displayed
  value will initially be "...".  Clicking that will open a dropdown control (constructed
  with ShadCN's DropdownMenu component, imported from *@repo/shadcn-ui*) containing the
  available actions.  Clicking on an individual action will trigger the function defined
  for that action, passing the current row as a parameter.

Construct modifications to the DataTable module to implement the requested logic,
but ask me for confirmation before actually modifying anything.

