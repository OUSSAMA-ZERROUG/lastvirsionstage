"use client";

import React, { useState, useEffect } from "react";
import { ComboboxDemo } from "@/components/ui/Combobox";
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

  const [value, setValue] = useState<string | undefined>("");

  // Fonction de filtrage et de sélection
  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue); // Définit la valeur sélectionnée dans le state
  };

  useEffect(() => {
    // Mettre à jour le filtre lorsque la valeur du ComboBox change
    table.getColumn("guardPerson_name")?.setFilterValue(value);
  }, [value, table]);

  return (
    <>
      {/* Champs de saisie pour le filtrage */}
      <div className="flex items-center py-6">
        <div className="flex mr-8">
          <p className="mt-2 mr-2">Personne de garde : </p>
          <ComboboxDemo
            value={value}
            setValue={setValue}
            onBlur={() => { }}
            onClick={() => { }}
            onSelect={handleSelect} // Passer la fonction de sélection
          />
        </div>
        <p className="mt-2 mr-2">Site : </p>
        <input
          placeholder="Filter site..."
          value={(table.getColumn("equipment_building")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("equipment_building")?.setFilterValue(event.target.value)
          }
          className="max-w-sm px-4 py-2 mr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />



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

      {/* Tableau de données */}
      <div className="rounded-md border border-orange-100">
        <Table>
          <TableHeader className="rounded-md border bg-orange-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
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
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Boutons de pagination */}
      <div className="flex items-center justify-end space-x-4 py-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border border-gray-500 text-gray-500 font-bold py-3 px-6 rounded"
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border border-gray-500 text-gray-500 font-bold py-3 px-6 rounded"
        >
          Suivant
        </Button>
      </div>
    </>
  );
}
