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

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

type DataTableProps<TData> = {
  // Handler for create action
  onCreate?: () => void;
  // Handler for remove action
  onRemove?: (data: TData) => void;
  // Handler for update action
  onUpdate?: (data: TData) => void;
  // Show pagination controls
  showPagination?: boolean;
  // The Tanstack Table we are displaying
  table: Table<TData>,
}

export function DataTable<TData>({ onCreate, onRemove, onUpdate, showPagination, table }: DataTableProps<TData>) {

  const pageCount = table.getPageCount();

  return (
    <>

      {onCreate && (
        <div className="p-2">
          <button
            onClick={onCreate}
            className="btn btn-primary btn-sm"
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
            {(onRemove || onUpdate) && (
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
            {(onRemove || onUpdate) && (
              <td className="p-2">
                <div className="flex gap-2">
                  {onUpdate && (
                    <button
                      onClick={() => onUpdate(row.original)}
                      className="btn btn-secondary btn-sm"
                    >
                      Update
                    </button>
                  )}
                  {onRemove && (
                    <button
                      onClick={() => onRemove(row.original)}
                      className="btn btn-error btn-sm"
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
