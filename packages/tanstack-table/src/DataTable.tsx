"use client";

/**
 * Generic data table rendering component, using TanStack Table.
 */

// External Modules ----------------------------------------------------------

import {
  flexRender,
  Table,
} from "@tanstack/react-table";
import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  ArrowUpAZ,
} from "lucide-react";
import { createElement, useState } from "react";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export type MutationFormProps<TData> = {
  // The data model we are editing or removing (or null if creating)
  data: TData | null;
  // Are we removing (true) or creating/updating (false)?
  isRemoving: boolean | null;
}

type DataTableProps<TData> = {
  // React component that implements the CRUD behaviors for TData
  mutators?: (props: MutationFormProps<TData>) => React.JSX.Element | undefined;
  // Show pagination controls
  showPagination?: boolean;
  // If we have mutators, support creating new rows
  supportsCreating?: boolean;
  // If we have mutators, support removing rows
  supportsRemoving?: boolean;
  // If we have mutators, support updating rows
  supportsUpdating?: boolean;
  // The Tanstack Table we are displaying
  table: Table<TData>,
}

export function DataTable<TData>(
  {
    mutators,
    showPagination,
    supportsCreating,
    supportsRemoving,
    supportsUpdating,
    table
  }: DataTableProps<TData>) {

  const [creatingRow, setCreatingRow] = useState<TData | null>(null);
  const [removingRow, setRemovingRow] = useState<TData | null>(null);
  const [updatingRow, setUpdatingRow] = useState<TData | null>(null);

  const pageCount = table.getPageCount();

  return (
    <>

      {mutators && (creatingRow || updatingRow || removingRow) && (
        <div className="modal modal-open">
          <div className="modal-box">
            {createElement(mutators, {
              data: updatingRow || removingRow, // NOTE: not passing creatingRow
              isRemoving: !!removingRow,
            })}
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  setCreatingRow(null);
                  setUpdatingRow(null);
                  setRemovingRow(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {mutators && supportsCreating && (
        <div className="p-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setCreatingRow({} as TData);
            }}
          >
            Add New
          </button>
        </div>
      )}

      <table className="table table-zebra w-full">

        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
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
              </th>
            ))}
            {(mutators && (supportsRemoving || supportsUpdating)) && (
              <th className="p-2">Actions</th>
            )}
          </tr>
        ))}
        </thead>

        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
            {(mutators && (supportsRemoving || supportsUpdating)) && (
              <td className="p-2">
                <div className="flex gap-2">
                  {supportsUpdating && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setUpdatingRow(row.original);
                      }}
                    >
                      Update
                    </button>
                  )}
                  {supportsRemoving && (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => {
                        setRemovingRow(row.original);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
        </tbody>

        { showPagination ? (
          <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length}>
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
            </th>
          </tr>
          </tfoot>
        ) : null }

      </table>

    </>

  );

}
