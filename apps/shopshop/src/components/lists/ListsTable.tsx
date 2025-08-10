"use client";

/**
 * Lists table for the currently signed in profile.
 */

// External Imports ----------------------------------------------------------

import { DataTable } from "@repo/tanstack-table/DataTable";
import {
  CellContext,
//  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
//  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { /*useEffect,*/ useMemo, useState } from "react";

// Internal Imports ----------------------------------------------------------

import { ListPlus, ProfilePlus } from "@/types/Types";

// Public Objects ------------------------------------------------------------

export type ListsTableProps = {
  // All Lists for the signed in profile.
  allLists: ListPlus[];
  // The currently signed in profile.
  profile: ProfilePlus;
}

export function ListsTable({ allLists, profile }: ListsTableProps) {

//  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {id: "name", desc: false},
  ]);
//  const [nameFilter, setNameFilter] = useState<string>("");

  // Apply selection filters whenever they change
  /*
    useEffect(() => {

      const filters: ColumnFiltersState = [];

      if (nameFilter.length > 0) {
        filters.push({
          id: "name",
          value: nameFilter,
        });
      }

      setColumnFilters(filters);
    }, [nameFilter]);
  */

  // Define columns for the table
  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      cell: info => info.getValue(),
      header: "List Name",
      id: "name",
    }),
    columnHelper.display({
      cell: (info: CellContext<ListPlus, unknown>) => {
        const list = info.row.original;
        return (
          <div className="flex items-center gap-2">
            <Link
              href={`/lists/${list.id}`}
              className="btn btn-primary btn-sm"
            >
              View
            </Link>
            <Link
                href={`/lists/${list.id}/edit`}
                className="btn btn-secondary btn-sm"
              >
                Edit
            </Link>
          </div>
        );
      },
      header: "Actions",
      id: "actions",
    }),
  ], [columnHelper]);

  // Create the table instance
  const table = useReactTable({
    data: allLists,
    columns,
    state: {
//      columnFilters,
      pagination,
      sorting,
    },
//    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
//    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataTable
      showPagination={true}
      table={table}
    />
  )

}

// Private Objects ---------------------------------------------------------

/**
 * Helper for creating columns in the Lists table.
 */
const columnHelper = createColumnHelper<ListPlus>();
