"use client";

/**
 * Lists table for the currently signed in profile.
 */

// External Imports ----------------------------------------------------------

import { MemberRole } from "@repo/db-shopshop/index";
import { DataTable, TableAction } from "@repo/shadcn-tanstack-table/DataTable";
import {
  Card,
//  CardAction,
  CardContent,
  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import {
  Field,
//  FieldContent,
//  FieldDescription,
//  FieldError,
//  FieldGroup,
  FieldLabel,
//  FieldLegend,
//  FieldSeparator,
//  FieldSet,
//  FieldTitle,
} from "@repo/shadcn-ui/components/field";
import { Input } from "@repo/shadcn-ui/components/input";
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { BadgeX, Pencil } from "lucide-react";
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
  const [nameFilter, setNameFilter] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {id: "list.name", desc: false},
  ]);

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

  // Define the per-row actions
  const actions: TableAction<MemberPlus>[] = useMemo(() => [
    {
      icon: <Pencil size={16}/>,
      label: "Edit",
      onClick: (row: Row<MemberPlus>)  => {
        alert(`Edit list: ${row.original.list!.name}`);
      }
    },
    {
      icon: <BadgeX size={16}/>,
      label: "Remove",
      onClick: (row: Row<MemberPlus>) => {
        alert(`Remove list: ${row.original.list!.name}`);
      }
    },
  ], []);

  return (
    <Card className="w-xl bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Your Lists</CardTitle>
        <CardDescription className="text-center">
          Manage your shopping lists below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="nameFilter">Filter by List Name</FieldLabel>
            <Input
              id="nameFilter"
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="List Name..."
              value={nameFilter}
            />
          </Field>
        </div>
        <DataTable
          actions={actions}
          showPagination={true}
          table={table}
        />
      </CardContent>
    </Card>
  )

}

// Private Objects ---------------------------------------------------------

/**
 * Helper for creating columns in the Lists table.
 */
const columnHelper = createColumnHelper<MemberPlus>();
