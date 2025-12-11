"use client";

/**
 * Categories table for the specified List.
 */

// External Imports ----------------------------------------------------------

import { DataTable } from "@repo/daisy-tanstack-table/DataTable";
import { TextFieldFilter } from "@repo/daisy-tanstack-table/TextFieldFilter";
import {
  CellContext,
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

import { CategoryPlus, ListPlus, ProfilePlus } from "@/types/Types";
import {Props} from "next/script";

// Public Objects ------------------------------------------------------------

export type CategoriesTableProps = {
  // All Categories for the specified List.
  categories: CategoryPlus[];
  // The List for which we are managing Categories.
  list: ListPlus;
  // The currently signed in profile.
  profile: ProfilePlus;
}

export function CategoriesTable({ categories, list, profile }: CategoriesTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {id: "name", desc: false},
  ]);

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
      cell: (info: CellContext<CategoryPlus, string>) => info.getValue(),
      header: () => <span>Name</span>,
    }),
  ], []);

  // Create the table instance
  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      pagination,
      sorting,
    },
  });

  // Render the table TODO - add mutation support
  return (
    <div className={"card bg-info/50 border-2 rounded-2xl"}>
      <div className="card-body">
        <DataTable
          showPagination={true}
          table={table}
          // title={`Categories for List '{list.name}'`}
        />
      </div>
      <div className="card-actions justify-center px-6 pb-2">
        <TextFieldFilter
          controlId="nameFilter"
          label="Filter by Category Name"
          placeholder="Category Name..."
          setTextFieldFilter={setNameFilter}
          textFieldFilter={nameFilter}
        />
      </div>
    </div>
  )

}

// Private Objects -----------------------------------------------------------

const columnHelper = createColumnHelper<CategoryPlus>();
