"use client";


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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataRappelTable<TData, TValue>({
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
  const [selectedOption, setSelectedOption] = React.useState("Id_rappel");


  return (
    <>
      {/* Input fields for filtering */}
      <div className="flex items-center py-6">
        <div className="flex mr-8">
          <label className="mr-2 mt-3"> Search by : </label>
          <select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:border-orange-500"
          >
            <option value="diffusion">Nom de contact</option>
            <option value="equipment_building">Site Equipment</option>
            <option value="guardPerson_name">Personne de garde</option>
            <option value="interventionPersonName_name">Nom du support</option>
          </select>
          <input
            placeholder={`Filter ${selectedOption}...`}
            value={(table.getColumn(selectedOption)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(selectedOption)?.setFilterValue(event.target.value)
            }
            className="border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex mr-8">
          <label className="mr-2 mt-3"> Date de début </label>
          <input
            type="date"
            value={(table.getColumn("startAt")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("startAt")?.setFilterValue(event.target.value)
            }
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex">
          <label className="mr-2 mt-3"> Date de Fin </label>
          <input
            type="date"
            value={(table.getColumn("endAt")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("endAt")?.setFilterValue(event.target.value)
            }
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Data table */}
      <div className="rounded-md border  border-orange-100">
        <Table>
          <TableHeader className="rounded-md border  bg-orange-100" >
       
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
