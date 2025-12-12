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
import { MemberRole } from "@repo/db-shopshop/index";
import { useEffect, useMemo, useState } from "react";

// Internal Imports ----------------------------------------------------------

//import { ListMutationForm } from "@/components/lists/ListMutationForm";
import { MemberPlus, ProfilePlus } from "@/types/Types";

// Public Objects ------------------------------------------------------------

export type ListsTableProps = {
  // Memberships of the currently signed in profile.
  memberships: MemberPlus[];
  // The currently signed in profile.
  profile: ProfilePlus;
}

export function ListsTable({ memberships /*, profile */ }: ListsTableProps) {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {id: "list.name", desc: false},
  ]);
  const [nameFilter, setNameFilter] = useState<string>("");

  // Apply selection filters whenever they change
  useEffect(() => {

    const filters: ColumnFiltersState = [];

    if (nameFilter.length > 0) {
      filters.push({
        id: "list.name",
        value: nameFilter,
      });
    }

    setColumnFilters(filters);
  }, [nameFilter]);

  // Define columns for the table
  const columns = useMemo(() => [
    columnHelper.accessor("list.name", {
      cell: info => info.getValue(),
      header: "List Name",
      id: "list.name",
    }),
    columnHelper.display({
      cell: info => {
        return info.row.original.role === MemberRole.ADMIN
          ? "Admin" : "Guest";
      },
      header: "Role",
      id: "role",
    })
  ], []);

  // Create the table instance
  const table = useReactTable({
    data: memberships,
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
        <h2 className="card-title justify-center">
          Your Lists
        </h2>
        <div className="card-actions justify-center px-2 pb-2">
          <TextFieldFilter
            controlId="nameFilter"
            label="Filter by List Name"
            placeholder="List Name..."
            setTextFieldFilter={setNameFilter}
            textFieldFilter={nameFilter}
          />
        </div>
        <DataTable
          showPagination={true}
          table={table}
          // title="Your Shopping Lists"
        />
      </div>
    </div>
  )

}

// Private Objects ---------------------------------------------------------

/**
 * Helper for creating columns in the Lists table.
 */
const columnHelper = createColumnHelper<MemberPlus>();
