"use client";

/**
 * Generic data table rendering component, using TanStack Table.
 */

// External Modules ----------------------------------------------------------

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn-ui/components/table"
import {
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  ArrowUpAZ,
//  Pencil,
//  Plus,
//  Trash,
//  X,
} from "lucide-react";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

/*
export type MutationFormProps<TData> = {
  // The data model we are editing or removing (or null if creating)
  data: TData | null;
  // Are we removing (true) or creating/updating (false)?
  isRemoving: boolean | null;
  // A cleanup function to call when the mutation is complete
  // (either successfully or not)
  onComplete?: () => void;
}
*/

type DataTableProps<TData> = {
  // React component that implements the CRUD behaviors for TData
//  mutators?: (props: MutationFormProps<TData>) => React.JSX.Element | undefined;
  // Show pagination controls
  showPagination?: boolean;
  // The Tanstack Table we are displaying
  table: TanstackTable<TData>,
  // Optional title for the table
  title?: string;
  // Optional CSS classes to apply to the table title ["card-title justify-center"]
  titleClassName?: string;
}

export function DataTable<TData>(
  {
    showPagination,
    table,
    title,
    titleClassName = "w-full justify-center",
  }: DataTableProps<TData>) {

  // Pagination state
  const pageCount = table.getPageCount();

  return (
    <>

      {/*
      {showModal && mutators && (creatingRow || updatingRow || removingRow) && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <div className="flex flex-row w-full justify-end">
              <span className="tooltip tooltip-left" data-tip="Close" >
              <button
                className="btn btn-sm btn-ghost justify-end"
                onClick={() => {
                  setCreatingRow(null);
                  setUpdatingRow(null);
                  setRemovingRow(null);
                  setShowModal(false);
                  // No revalidate on modal close without a mutation
                }}
              >
                <X size={16}/>
              </button>
              </span>
            </div>
            {createElement(mutators, {
              data: updatingRow || removingRow, // NOTE: not passing creatingRow
              isRemoving: !!removingRow,
              onComplete: onComplete,
            })}
          </div>
        </dialog>
      )}
*/}

      {/*
      {mutators && (supportsCreating || title) && (

        <div className={clsx(titleClassName, "p-2")}>
         {title && (
            <span>{title}</span>
          )}
          {supportsCreating && (
            <span className="tooltip tooltip-right" data-tip="Add">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setCreatingRow({} as TData);
              setShowModal(true);
            }}
          >
            <Plus size={16}/>
          </button>
          </span>
          )}
        </div>
      )}
*/}

      <Table>

        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  <div  className="flex flex-row w-full justify-center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    { header.column.getCanSort() ? (
                        <>
                    <span
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: "pointer" }}
                    >
                      {header.column.getIsSorted() === "asc" ? (
                        <ArrowUpAZ className="ms-2 text-info" size={24}/>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ArrowDownAZ className="ms-2 text-info" size={24}/>
                      ) : (
                        <ArrowDownUp className="ms-2 text-info" size={24}/>
                      )}
                    </span>
                        </>
                      ) :
                      null
                    }
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        { showPagination ? (
          <TableFooter>
            <TableRow>
              <TableHead colSpan={table.getCenterLeafColumns().length}>
                <div className="text-center space-x-4">
              <span className="tooltip" data-tip="First Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.firstPage()}
                >
                  <ArrowLeftToLine/>
                </button>
              </span>
                  <span className="tooltip" data-tip="Previous Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                >
                  <ArrowLeft/>
                </button>
              </span>
                  <span className="tooltip" data-tip="Next Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                >
                  <ArrowRight/>
                </button>
              </span>
                  <span className="tooltip" data-tip="Last Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.lastPage()}
                >
                  <ArrowRightToLine/>
                </button>
              </span>
                  <span>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {pageCount > 0 ? pageCount : `1`}{" "}| Total of{" "}
                    {table.getRowCount().toLocaleString()} Rows
              </span>
                </div>
              </TableHead>
            </TableRow>
          </TableFooter>
        ) : null }

      </Table>

    </>

  );

}
