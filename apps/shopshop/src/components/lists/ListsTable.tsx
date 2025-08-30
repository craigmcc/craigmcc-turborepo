"use client";

/**
 * Lists table for the currently signed in profile.
 */

// External Imports ----------------------------------------------------------

import { DataTable } from "@repo/tanstack-table/DataTable";
import {
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
import { /*useEffect,*/ useMemo, useState } from "react";

// Internal Imports ----------------------------------------------------------

import { ListMutationForm } from "@/components/lists/ListMutationForm";
import { ListPlus, ProfilePlus } from "@/types/Types";

// Public Objects ------------------------------------------------------------

export type ListsTableProps = {
  // All Lists for the signed in profile.
  allLists: ListPlus[];
  // The currently signed in profile.
  profile: ProfilePlus;
}

export function ListsTable({ allLists /*, profile */ }: ListsTableProps) {

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
  ], []);

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
  <div className="card bg-info/50 border-2 rounded-2xl">
    <div className="card-body">
      <h2 className="card-title justify-center">
        Your Shopping Lists
      </h2>
      <DataTable
        mutators={ListMutationForm}
        showPagination={true}
        supportsCreating={true}
        supportsRemoving={true}
        supportsUpdating={true}
        table={table}
      />
    </div>
  </div>
  )

}

// Private Objects ---------------------------------------------------------

/**
 * Helper for creating columns in the Lists table.
 */
const columnHelper = createColumnHelper<ListPlus>();
