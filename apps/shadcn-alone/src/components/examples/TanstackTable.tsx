"use client";

/**
 * Tanstack Table with Shadcn UI styling.
 */

// External Modules ----------------------------------------------------------

import { DataTable } from "@repo/shadcn-tanstack-table/DataTable";
//import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { useMemo, useState } from "react";

// Internal Modules ----------------------------------------------------------

import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/types/types";

// Public Objects ------------------------------------------------------------

export type TanstackTableProps = {
  // Dummy user data
  users: User[],
}

export function TanstackTable({ users }: TanstackTableProps) {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: false },
  ]);

  const columns = useMemo(() => [
    columnHelper.accessor("id", {
      enableSorting: true,
      header: "Id",
      cell: (info: CellContext<User, number>) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      enableSorting: true,
      header: "Name",
      cell: (info: CellContext<User, string>) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info: CellContext<User, string>) => info.getValue(),
    }),
  ], []);

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(users.length / pagination.pageSize),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <DataTable
        showPagination={true}
        table={table}
      />
    </div>
  );

}

// Private Objects -----------------------------------------------------------

const columnHelper = createColumnHelper<User>();
