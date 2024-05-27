"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataEquipmentTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });


  return (

    <>
      {/* Input fields for filtering */}
      <div className="flex items-center py-6">
        <div className="flex mr-8">
          <Input
            placeholder="Filter tag..."
            value={(table.getColumn("tag")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("tag")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex">
          <Input
            placeholder="Filter site..."
            value={(table.getColumn("site")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("site")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="flex items-center py-6">
        <div className="flex mr-8">
          <Input
            placeholder="Filter building..."
            value={(table.getColumn("building")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("building")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex">
          <Input
            placeholder="Filter UserID..."
            value={(table.getColumn("family")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("family")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>

      {/* Data table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center justify-end space-x-4 py-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border border-gray-500 text-gray-500 font-bold py-3 px-6 rounded"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border border-gray-500 text-gray-500 font-bold py-3 px-6 rounded"
        >
          Next
        </Button>
      </div>
    </>
  );

}
