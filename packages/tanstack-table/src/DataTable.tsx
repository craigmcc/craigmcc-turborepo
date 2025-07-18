"use client";

/**
 * Generic data table rendering component, using TanStack Table.
 */

// External Modules ----------------------------------------------------------

import {
  flexRender,
  Table,
} from "@tanstack/react-table";
import { ArrowDownAZ, ArrowUpAZ, ArrowDownUp } from "lucide-react";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

type DataTableProps<TData> = {
  // Show pagination controls
  showPagination?: boolean;
  // The Tanstack Table we are displaying
  table: Table<TData>,
}

export function DataTable<TData>({ showPagination, table }: DataTableProps<TData>) {

  const pageCount = table.getPageCount();

  return (
    <table className="table border table-zebra">

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
        </tr>
      ))}
      </tbody>

      { showPagination ? (
        <tfoot>
        <tr>
          <th colSpan={table.getCenterLeafColumns().length}>
            <div className="text-center">
              <div className="tooltip" data-tip="First Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.firstPage()}
                >
                  {'<<'}
                </button>
              </div>
              <span>&nbsp;</span>
              <div className="tooltip" data-tip="Previous Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                >
                  {'<'}
                </button>
              </div>
              <span>&nbsp;</span>
              <div className="tooltip" data-tip="Next Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                >
                  {'>'}
                </button>
              </div>
              <span>&nbsp;</span>
              <div className="tooltip" data-tip="Last Page">
                <button
                  className="btn btn-info"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.lastPage()}
                >
                  {'>>'}
                </button>
              </div>
              <span className="p-1">
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

  );

}
