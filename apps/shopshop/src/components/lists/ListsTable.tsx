"use client";

/**
 * Lists table for the currently signed in profile.
 */

// External Imports ----------------------------------------------------------

import { DataTable } from "@repo/daisy-tanstack-table/DataTable";
import { TextFieldFilter } from "@repo/daisy-tanstack-table/TextFieldFilter";
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

// Internal Imports ----------------------------------------------------------

//import { ListMutationForm } from "@/components/lists/ListMutationForm";
import { ListPlus, ProfilePlus } from "@/types/Types";

// Public Objects ------------------------------------------------------------

export type ListsTableProps = {
  // All Lists for the signed in profile.
  allLists: ListPlus[];
  // The currently signed in profile.
  profile: ProfilePlus;
}

export function ListsTable({ allLists /*, profile */ }: ListsTableProps) {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {id: "name", desc: false},
  ]);
  const [nameFilter, setNameFilter] = useState<string>("");

  // Apply selection filters whenever they change
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
      columnFilters,
      pagination,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="card bg-info/50 border-2 rounded-2xl">
      <div className="card-body">
        <DataTable
          showPagination={true}
          table={table}
          // title="Your Shopping Lists"
        />
      </div>
      <div className="card-actions justify-center px-6 pb-2">
        <TextFieldFilter
          controlId="nameFilter"
          label="Filter by List Name"
          placeholder="List Name..."
          setTextFieldFilter={setNameFilter}
          textFieldFilter={nameFilter}
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
