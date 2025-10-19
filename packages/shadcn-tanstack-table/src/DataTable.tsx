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
} from "@repo/shadcn-ui/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/shadcn-ui/components/tooltip";
import {
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";
//import clsx from "clsx";
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
}

export function DataTable<TData>(
  {
    showPagination,
    table,
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

      <Table className="border border-4 rounded-md">

        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  <div  className="flex flex-row w-full justify-center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    { header.column.getCanSort() ? (
                        <>
                          <span>&nbsp;</span>
                    <span
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: "pointer" }}
                    >
                      {header.column.getIsSorted() === "asc" ? (
                        <ArrowUpAZ className="text-info" size={24}/>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ArrowDownAZ className="text-info" size={24}/>
                      ) : (
                        <ArrowDownUp className="text-info" size={24}/>
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
            <TableRow key={row.id} className="odd:bg-muted/50 odd:hover:bg-muted/50">
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
                <div className="text-center mt-2 flex flex-row justify-center items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.firstPage()}>
                        <ArrowLeftToLine/>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      First Page
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}>
                        <ArrowLeft/>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Previous Page
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}>
                        <ArrowRight/>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Next Page
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.lastPage()}>
                        <ArrowRightToLine/>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Last Page
                    </TooltipContent>
                  </Tooltip>
                  <span className="p-4">
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
