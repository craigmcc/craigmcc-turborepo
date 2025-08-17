"use client";

/**
 * Table with Tanstack Table formatting and DaisyUI styling.
 */

// External Modules ----------------------------------------------------------

//import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { DataTable } from "@repo/tanstack-table/DataTable";
import { useMemo, useState } from "react";
//import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import {
  CellContext,
  createColumnHelper,
//  flexRender,
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
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info: CellContext<User, string>) => info.getValue(),
    }),
  ], []);

  const table = useReactTable<User>({
    columns,
    data: users,
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting
    },
  });

  return (
    <div className="card bg-info/50 border-2 rounded-2xl">
      <div className="card-body">
        <h2 className="card-title justify-center">
          Tanstack Table
        </h2>
        <DataTable showPagination={true} table={table}/>
      </div>
    </div>
  )

}

// Private Objects -----------------------------------------------------------

const columnHelper = createColumnHelper<User>();
